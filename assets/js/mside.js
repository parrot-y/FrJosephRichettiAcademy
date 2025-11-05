/* Namespaced Mobile Sidebar injection (mside-*) - non-invasive */
(function(){
	if (typeof window === 'undefined') return;
	function create(el, attrs, children){
		const e = document.createElement(el);
		if (attrs) Object.entries(attrs).forEach(([k,v])=>{ if (v!==null && v!==undefined) e.setAttribute(k, v); });
		(children||[]).forEach(c=> e.appendChild(c));
		return e;
	}
	function getMainNavLinks(){
		const nav = document.querySelector('.main-nav .nav');
		if (!nav) return [];
		return [...nav.querySelectorAll('a')].map(a=>({ href: a.getAttribute('href') || '#', text: a.textContent.trim() }));
	}
	function buildSidebar(links){
		const overlay = create('div', { id:'msideOverlay', class:'mside-overlay', hidden:'' });
		const btn = create('button', { id:'msideBtn', class:'mside-hamburger', 'aria-controls':'msidePanel', 'aria-expanded':'false', 'aria-label':'Open menu' }, [
			create('span', { class:'mside-bar' })
		]);
		const closeBtn = create('button', { id:'msideClose', class:'mside-close', 'aria-label':'Close menu', title:'Close' });
		closeBtn.textContent = '×';
		const ul = create('ul', { id:'msideMenu', class:'mside-menu' });
		links.forEach(l=>{
			const li = create('li');
			const a = create('a', { href: l.href });
			a.textContent = l.text;
			li.appendChild(a); ul.appendChild(li);
		});
		const nav = create('nav', { 'aria-label':'Mobile navigation' }, [ul]);
		const panel = create('aside', { id:'msidePanel', class:'mside-panel', 'aria-hidden':'true' }, [closeBtn, nav]);
		return { overlay, btn, panel };
	}
	function focusables(root){
		return [...root.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')].filter(el=>!el.hasAttribute('disabled'));
	}
	function init(){
		const links = getMainNavLinks();
		if (!links.length) return; // nothing to do
		const { overlay, btn, panel } = buildSidebar(links);
		document.body.appendChild(overlay);
		document.body.appendChild(panel);
		document.body.appendChild(btn);

		// Ensure closed state on load (defensive against other scripts/styles)
        function ensureClosedInit(){
			document.body.classList.remove('mside-open');
			panel.classList.remove('mside-on');
			panel.setAttribute('aria-hidden','true');
			btn.setAttribute('aria-expanded','false');
			overlay.hidden = true;
			// force off-canvas position
            panel.style.transform = 'translateX(100%)';
            panel.style.display = 'none';
		}
		ensureClosedInit();

		let lastFocused = null;
		const mqDesktop = window.matchMedia('(min-width: 992px)');

        function open(){
			lastFocused = document.activeElement;
			document.body.classList.add('mside-open');
            panel.style.display = 'flex';
			panel.classList.add('mside-on');
			panel.setAttribute('aria-hidden','false');
			btn.setAttribute('aria-expanded','true');
			overlay.hidden = false;
			const f = focusables(panel); if (f.length) setTimeout(()=>f[0].focus(), 10);
			document.addEventListener('keydown', trap);
			document.addEventListener('keydown', onEsc);
		}
        function close(){
			document.body.classList.remove('mside-open');
			panel.classList.remove('mside-on');
			panel.setAttribute('aria-hidden','true');
			btn.setAttribute('aria-expanded','false');
			overlay.hidden = true;
            setTimeout(()=>{ if (!panel.classList.contains('mside-on')) panel.style.display = 'none'; }, 300);
			document.removeEventListener('keydown', trap);
			document.removeEventListener('keydown', onEsc);
			if (lastFocused) lastFocused.focus();
		}
		function trap(e){
			if (e.key !== 'Tab') return; const f = focusables(panel); if (!f.length) return;
			const first = f[0], last = f[f.length-1];
			if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
			else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
		}
		function onEsc(e){ if (e.key === 'Escape') close(); }

		btn.addEventListener('click', (e)=>{ e.preventDefault(); panel.classList.contains('mside-on') ? close() : open(); });
		const closeEl = panel.querySelector('#msideClose') || panel.querySelector('.mside-close');
		if (closeEl) closeEl.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); close(); });
		overlay.addEventListener('click', close);
		panel.addEventListener('click', (e)=>{ if (e.target.matches('a')) close(); });
		mqDesktop.addEventListener('change', ()=>{ if (mqDesktop.matches) close(); else ensureClosedInit(); });
	}

	if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();



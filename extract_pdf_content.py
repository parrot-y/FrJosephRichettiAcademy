#!/usr/bin/env python3

import pdfplumber
import sys

def extract_and_save_pdf_content():
    try:
        # Extract history PDF
        with pdfplumber.open('PDF/HISTORY OF THE SCHOOL final draft (1).pdf') as pdf:
            history_text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    history_text += page_text + '\n'
        
        # Save history content
        with open('history_content.txt', 'w', encoding='utf-8') as f:
            f.write("HISTORY OF THE SCHOOL CONTENT:\n")
            f.write("=" * 50 + "\n")
            f.write(history_text)
        
        # Extract consent form PDF
        with pdfplumber.open('PDF/consent forms forimmunizatuion.pdf') as pdf:
            consent_text = ''
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    consent_text += page_text + '\n'
        
        # Save consent content
        with open('consent_content.txt', 'w', encoding='utf-8') as f:
            f.write("CONSENT FORM CONTENT:\n")
            f.write("=" * 50 + "\n")
            f.write(consent_text)
        
        print("PDF content extracted successfully!")
        print("Files created: history_content.txt, consent_content.txt")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_and_save_pdf_content()

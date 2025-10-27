<?php
// Fr. Joseph Richetti Catholic School - Contact Admin Panel
// View and manage contact form submissions

// Basic authentication
$admin_username = "admin";
$admin_password = "FrJoseph2024!";

session_start();

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === $admin_username && $_POST['password'] === $admin_password) {
        $_SESSION['contact_admin'] = true;
    } else {
        $error = "Invalid credentials";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: contact_admin.php');
    exit;
}

// Check if user is logged in
$is_logged_in = isset($_SESSION['contact_admin']) && $_SESSION['contact_admin'];

// Load contact submissions
$contacts = array();
$contacts_file = 'contact_submissions.json';
if (file_exists($contacts_file)) {
    $data = file_get_contents($contacts_file);
    $contacts = json_decode($data, true) ?: array();
}

// Load contact log
$log_entries = array();
$log_file = 'contact_submissions.log';
if (file_exists($log_file)) {
    $log_content = file_get_contents($log_file);
    $log_entries = array_reverse(explode("\n", trim($log_content)));
    $log_entries = array_slice($log_entries, 0, 50);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Admin - Fr. Joseph Richetti Catholic School</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #1f272b; color: white; padding: 20px; margin: -30px -30px 30px -30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; border-left: 4px solid #0047AB; }
        .stat-number { font-size: 32px; font-weight: bold; color: #1f272b; margin-bottom: 5px; }
        .stat-label { color: #666; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
        th { background: #f8f9fa; font-weight: 600; color: #1f272b; }
        .login-form { max-width: 400px; margin: 100px auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: 600; }
        input[type="text"], input[type="password"] { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; }
        .btn { background: #1f272b; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; text-decoration: none; display: inline-block; }
        .btn:hover { background: #0047AB; }
        .error { color: #e53e3e; margin-top: 10px; font-size: 14px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1f272b; border-bottom: 2px solid #0047AB; padding-bottom: 10px; }
        .message-preview { max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .status-new { color: #0047AB; font-weight: bold; }
        .logout-link { float: right; color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; }
        .logout-link:hover { color: white; }
        .export-btn { background: #0047AB; color: white; }
    </style>
</head>
<body>

<?php if (!$is_logged_in): ?>
    <div class="login-form">
        <h2 style="text-align: center; color: #1f272b; margin-bottom: 30px;">Contact Admin Login</h2>
        <form method="POST">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" name="login" class="btn" style="width: 100%;">Login</button>
            <?php if (isset($error)): ?>
                <div class="error"><?php echo $error; ?></div>
            <?php endif; ?>
        </form>
    </div>

<?php else: ?>
    <div class="container">
        <div class="header">
            <h1>Contact Form Administration</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Fr. Joseph Richetti Catholic School</p>
            <a href="?logout" class="logout-link">Logout</a>
        </div>

        <div class="stats">
            <div class="stat-card">
                <div class="stat-number"><?php echo count($contacts); ?></div>
                <div class="stat-label">Total Messages</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($contacts, function($c) { return date('Y-m-d', strtotime($c['submitted_date'])) === date('Y-m-d'); })); ?></div>
                <div class="stat-label">Today's Messages</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($contacts, function($c) { return strtotime($c['submitted_date']) >= strtotime('-7 days'); })); ?></div>
                <div class="stat-label">This Week</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($contacts, function($c) { return $c['status'] === 'new'; })); ?></div>
                <div class="stat-label">New Messages</div>
            </div>
        </div>

        <div class="section">
            <h2>Contact Form Submissions</h2>
            <a href="data:text/csv;charset=utf-8,<?php echo rawurlencode('Name,Email,Subject,Message,Date,IP Address' . "\n" . implode("\n", array_map(function($c) { return '"' . $c['name'] . '","' . $c['email'] . '","' . $c['subject'] . '","' . str_replace('"', '""', $c['message']) . '","' . $c['submitted_date'] . '","' . $c['ip_address'] . '"'; }, $contacts))); ?>" download="contact_submissions.csv" class="btn export-btn">Export CSV</a>
            
            <?php if (empty($contacts)): ?>
                <p>No contact submissions yet.</p>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach (array_reverse($contacts) as $contact): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($contact['name']); ?></td>
                                <td><?php echo htmlspecialchars($contact['email']); ?></td>
                                <td><?php echo htmlspecialchars($contact['subject']); ?></td>
                                <td class="message-preview" title="<?php echo htmlspecialchars($contact['message']); ?>">
                                    <?php echo htmlspecialchars(substr($contact['message'], 0, 100)) . (strlen($contact['message']) > 100 ? '...' : ''); ?>
                                </td>
                                <td><?php echo date('M j, Y H:i', strtotime($contact['submitted_date'])); ?></td>
                                <td><span class="status-new"><?php echo ucfirst($contact['status']); ?></span></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <div class="section">
            <h2>Instructions</h2>
            <p><strong>Contact Management:</strong> All contact form submissions are stored locally and can be exported as CSV.</p>
            <p><strong>Follow Up:</strong> Contact submitters directly using their email addresses for admission inquiries and other requests.</p>
            <p><strong>Data Export:</strong> Use the Export CSV button to download all contact submissions for your records.</p>
        </div>
    </div>
<?php endif; ?>

</body>
</html>

<?php
// Fr. Joseph Richetti Catholic School - Newsletter Admin Panel
// Simple admin interface to view and manage newsletter subscriptions

// Basic authentication (change these credentials!)
$admin_username = "admin";
$admin_password = "richetti2024"; // Change this password!

session_start();

// Handle login
if (isset($_POST['login'])) {
    if ($_POST['username'] === $admin_username && $_POST['password'] === $admin_password) {
        $_SESSION['newsletter_admin'] = true;
    } else {
        $error = "Invalid credentials";
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: newsletter_admin.php');
    exit;
}

// Check if user is logged in
$is_logged_in = isset($_SESSION['newsletter_admin']) && $_SESSION['newsletter_admin'];

// Load subscribers data
$subscribers = array();
$subscribers_file = 'newsletter_subscribers.json';
if (file_exists($subscribers_file)) {
    $data = file_get_contents($subscribers_file);
    $subscribers = json_decode($data, true) ?: array();
}

// Load subscription log
$log_entries = array();
$log_file = 'newsletter_subscriptions.log';
if (file_exists($log_file)) {
    $log_content = file_get_contents($log_file);
    $log_entries = array_reverse(explode("\n", trim($log_content)));
    $log_entries = array_slice($log_entries, 0, 50); // Show last 50 entries
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter Admin - Fr. Joseph Richetti Catholic School</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
            color: #333;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            background: #1f272b;
            color: white;
            padding: 20px;
            margin: -30px -30px 30px -30px;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
            border-left: 4px solid #8b1538;
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #1f272b;
            margin-bottom: 5px;
        }
        .stat-label {
            color: #666;
            font-size: 14px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background: #f8f9fa;
            font-weight: 600;
            color: #1f272b;
        }
        .login-form {
            max-width: 400px;
            margin: 100px auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        .btn {
            background: #1f272b;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            text-decoration: none;
            display: inline-block;
        }
        .btn:hover {
            background: #8b1538;
        }
        .error {
            color: #e53e3e;
            margin-top: 10px;
            font-size: 14px;
        }
        .section {
            margin-bottom: 40px;
        }
        .section h2 {
            color: #1f272b;
            border-bottom: 2px solid #8b1538;
            padding-bottom: 10px;
        }
        .log-entry {
            font-family: monospace;
            font-size: 12px;
            padding: 5px;
            background: #f8f9fa;
            margin-bottom: 2px;
            border-radius: 3px;
        }
        .export-btn {
            background: #8b1538;
            color: #1f272b;
        }
        .logout-link {
            float: right;
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            font-size: 14px;
        }
        .logout-link:hover {
            color: white;
        }
    </style>
</head>
<body>

<?php if (!$is_logged_in): ?>
    <!-- Login Form -->
    <div class="login-form">
        <h2 style="text-align: center; color: #1f272b; margin-bottom: 30px;">Newsletter Admin Login</h2>
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
    <!-- Admin Dashboard -->
    <div class="container">
        <div class="header">
            <h1>Newsletter Administration</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.8;">Fr. Joseph Richetti Catholic School</p>
            <a href="?logout" class="logout-link">Logout</a>
        </div>

        <!-- Statistics -->
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number"><?php echo count($subscribers); ?></div>
                <div class="stat-label">Total Subscribers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($subscribers, function($s) { return $s['status'] === 'active'; })); ?></div>
                <div class="stat-label">Active Subscribers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($subscribers, function($s) { return date('Y-m-d', strtotime($s['subscribed_date'])) === date('Y-m-d'); })); ?></div>
                <div class="stat-label">Today's Subscriptions</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count(array_filter($subscribers, function($s) { return strtotime($s['subscribed_date']) >= strtotime('-7 days'); })); ?></div>
                <div class="stat-label">This Week</div>
            </div>
        </div>

        <!-- Subscribers List -->
        <div class="section">
            <h2>Newsletter Subscribers</h2>
            <a href="data:text/csv;charset=utf-8,<?php echo rawurlencode('Email,Subscribed Date,Status,IP Address' . "\n" . implode("\n", array_map(function($s) { return $s['email'] . ',' . $s['subscribed_date'] . ',' . $s['status'] . ',' . $s['ip_address']; }, $subscribers))); ?>" download="newsletter_subscribers.csv" class="btn export-btn">Export CSV</a>
            
            <?php if (empty($subscribers)): ?>
                <p>No subscribers yet.</p>
            <?php else: ?>
                <table>
                    <thead>
                        <tr>
                            <th>Email Address</th>
                            <th>Subscribed Date</th>
                            <th>Status</th>
                            <th>IP Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach (array_reverse($subscribers) as $subscriber): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($subscriber['email']); ?></td>
                                <td><?php echo date('M j, Y H:i', strtotime($subscriber['subscribed_date'])); ?></td>
                                <td><?php echo ucfirst($subscriber['status']); ?></td>
                                <td><?php echo htmlspecialchars($subscriber['ip_address']); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <!-- Recent Activity Log -->
        <div class="section">
            <h2>Recent Activity Log</h2>
            <?php if (empty($log_entries)): ?>
                <p>No activity logged yet.</p>
            <?php else: ?>
                <?php foreach ($log_entries as $entry): ?>
                    <?php if (trim($entry)): ?>
                        <div class="log-entry"><?php echo htmlspecialchars($entry); ?></div>
                    <?php endif; ?>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>

        <!-- Instructions -->
        <div class="section">
            <h2>How to Send Newsletters</h2>
            <p><strong>Manual Email:</strong> You can copy email addresses from the export and send newsletters manually through your email client.</p>
            <p><strong>Email Marketing Service:</strong> Import the CSV file into services like Mailchimp, Constant Contact, or similar platforms for professional newsletter campaigns.</p>
            <p><strong>Bulk Email:</strong> Use the exported email list with your school's email system to send announcements and updates.</p>
        </div>
    </div>
<?php endif; ?>

</body>
</html>

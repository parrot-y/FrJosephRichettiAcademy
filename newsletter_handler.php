<?php
// Fr. Joseph Richetti Catholic School - Newsletter Subscription Handler
// Handles newsletter subscriptions, sends confirmation emails, and notifies school

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// School configuration
$school_email = "frjosephrichetti@gmail.com";
$school_name = "Fr. Joseph Richetti Catholic School";
$website_url = "https://parrot-y.github.io/FrJosephRichettiAcademy/";

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to log subscriptions
function log_subscription($email, $status) {
    $log_entry = date('Y-m-d H:i:s') . " - Newsletter Subscription: $email - Status: $status" . PHP_EOL;
    file_put_contents('newsletter_subscriptions.log', $log_entry, FILE_APPEND | LOCK_EX);
}

// Function to store subscriber (simple file-based storage)
function store_subscriber($email) {
    $subscriber_data = array(
        'email' => $email,
        'subscribed_date' => date('Y-m-d H:i:s'),
        'status' => 'active',
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    );
    
    $subscribers_file = 'newsletter_subscribers.json';
    $subscribers = array();
    
    // Load existing subscribers
    if (file_exists($subscribers_file)) {
        $existing_data = file_get_contents($subscribers_file);
        $subscribers = json_decode($existing_data, true) ?: array();
    }
    
    // Check if email already exists
    foreach ($subscribers as $subscriber) {
        if ($subscriber['email'] === $email) {
            return false; // Already subscribed
        }
    }
    
    // Add new subscriber
    $subscribers[] = $subscriber_data;
    
    // Save updated subscribers list
    file_put_contents($subscribers_file, json_encode($subscribers, JSON_PRETTY_PRINT));
    return true;
}

// Function to send confirmation email to subscriber
function send_confirmation_email($subscriber_email, $school_email, $school_name, $website_url) {
    $subject = "Welcome to $school_name Newsletter!";
    
    $message = "
    <html>
    <head>
        <title>Newsletter Subscription Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f272b; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f8f8f8; }
            .footer { background: #1f272b; color: white; padding: 15px; text-align: center; font-size: 12px; }
            .button { display: inline-block; background: #2563eb; color: #1f272b; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>$school_name</h1>
                <p>Right is Light</p>
            </div>
            <div class='content'>
                <h2>Welcome to Our Newsletter!</h2>
                <p>Dear Parent/Guardian,</p>
                <p>Thank you for subscribing to the $school_name newsletter! You will now receive:</p>
                <ul>
                    <li>📚 Academic updates and curriculum information</li>
                    <li>📅 Important school events and calendar updates</li>
                    <li>🏆 Student achievements and success stories</li>
                    <li>📋 Examination schedules and academic announcements</li>
                    <li>🎯 Admissions information and deadlines</li>
                    <li>🏃‍♂️ Sports and extracurricular activities updates</li>
                </ul>
                <p>Stay connected with our school community and never miss important updates about your child's education.</p>
                <p style='text-align: center; margin: 30px 0;'>
                    <a href='$website_url' class='button'>Visit Our Website</a>
                </p>
                <p><strong>Contact Information:</strong><br>
                📧 Email: $school_email<br>
                📞 Phone: +254 712 345 678<br>
                📍 Location: Nairobi, Kenya</p>
            </div>
            <div class='footer'>
                <p>&copy; " . date('Y') . " $school_name. All rights reserved.</p>
                <p>You received this email because you subscribed to our newsletter.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $school_name <$school_email>" . "\r\n";
    $headers .= "Reply-To: $school_email" . "\r\n";
    
    return mail($subscriber_email, $subject, $message, $headers);
}

// Function to notify school about new subscription
function notify_school($subscriber_email, $school_email, $school_name) {
    $subject = "New Newsletter Subscription - $school_name";
    
    $message = "
    <html>
    <head>
        <title>New Newsletter Subscription</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f272b; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f8f8f8; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>New Newsletter Subscription</h1>
            </div>
            <div class='content'>
                <h2>Subscription Details</h2>
                <p><strong>Email:</strong> $subscriber_email</p>
                <p><strong>Date:</strong> " . date('Y-m-d H:i:s') . "</p>
                <p><strong>IP Address:</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "</p>
                <p>A confirmation email has been sent to the subscriber.</p>
                <p>You can manage newsletter subscriptions through your school administration panel.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Website <$school_email>" . "\r\n";
    
    return mail($school_email, $subject, $message, $headers);
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $json_input = file_get_contents('php://input');
    $data = json_decode($json_input, true);
    
    // Also handle form data
    if (!$data) {
        $data = $_POST;
    }
    
    if (isset($data['email'])) {
        $email = sanitize_input($data['email']);
        
        // Validate email
        if (!validate_email($email)) {
            log_subscription($email, 'Invalid email format');
            echo json_encode([
                'success' => false,
                'message' => 'Please enter a valid email address.'
            ]);
            exit;
        }
        
        // Store subscriber
        if (!store_subscriber($email)) {
            log_subscription($email, 'Already subscribed');
            echo json_encode([
                'success' => false,
                'message' => 'This email is already subscribed to our newsletter.'
            ]);
            exit;
        }
        
        // Send confirmation email to subscriber
        $confirmation_sent = send_confirmation_email($email, $school_email, $school_name, $website_url);
        
        // Notify school about new subscription
        $notification_sent = notify_school($email, $school_email, $school_name);
        
        if ($confirmation_sent) {
            log_subscription($email, 'Success - Confirmation sent');
            echo json_encode([
                'success' => true,
                'message' => 'Thank you for subscribing! Please check your email for confirmation.'
            ]);
        } else {
            log_subscription($email, 'Error - Email sending failed');
            echo json_encode([
                'success' => false,
                'message' => 'Subscription successful, but there was an issue sending the confirmation email. Please contact us directly.'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Email address is required.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>

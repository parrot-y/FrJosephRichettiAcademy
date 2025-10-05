<?php
// Fr. Joseph Richetti Catholic School - Newsletter Subscription Handler (Local Version)
// Works locally without email server configuration

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

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

// Function to store subscriber
function store_subscriber($email) {
    $subscriber_data = array(
        'email' => $email,
        'subscribed_date' => date('Y-m-d H:i:s'),
        'status' => 'active',
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'localhost'
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
        
        // Success response (without sending actual emails for local testing)
        log_subscription($email, 'Success - Local subscription');
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for subscribing! You have been added to our newsletter list.'
        ]);
        
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

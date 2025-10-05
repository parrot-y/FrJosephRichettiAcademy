<?php
// Fr. Joseph Richetti Catholic School - Contact Form Handler (Local Version)
// Fixed version for local development without email server

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to sanitize input (updated for PHP 8+)
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to log contact submissions
function log_contact($name, $email, $subject, $status) {
    $log_entry = date('Y-m-d H:i:s') . " - Contact Form: $name ($email) - Subject: $subject - Status: $status" . PHP_EOL;
    file_put_contents('contact_submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
}

// Function to store contact submission
function store_contact($name, $email, $subject, $message) {
    $contact_data = array(
        'name' => $name,
        'email' => $email,
        'subject' => $subject,
        'message' => $message,
        'submitted_date' => date('Y-m-d H:i:s'),
        'ip_address' => $_SERVER['REMOTE_ADDR'] ?? 'localhost',
        'status' => 'new'
    );
    
    $contacts_file = 'contact_submissions.json';
    $contacts = array();
    
    // Load existing contacts
    if (file_exists($contacts_file)) {
        $existing_data = file_get_contents($contacts_file);
        $contacts = json_decode($existing_data, true) ?: array();
    }
    
    // Add new contact
    $contacts[] = $contact_data;
    
    // Save updated contacts list
    file_put_contents($contacts_file, json_encode($contacts, JSON_PRETTY_PRINT));
    return true;
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $name = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = 'Name is required';
    }
    
    if (empty($email)) {
        $errors[] = 'Email is required';
    } elseif (!validate_email($email)) {
        $errors[] = 'Please enter a valid email address';
    }
    
    if (empty($subject)) {
        $errors[] = 'Subject is required';
    }
    
    if (empty($message)) {
        $errors[] = 'Message is required';
    }
    
    // If there are errors
    if (!empty($errors)) {
        log_contact($name, $email, $subject, 'Validation failed: ' . implode(', ', $errors));
        echo json_encode([
            'success' => false,
            'message' => implode('. ', $errors) . '.'
        ]);
        exit;
    }
    
    // Store the contact submission
    if (store_contact($name, $email, $subject, $message)) {
        log_contact($name, $email, $subject, 'Success - Message stored locally');
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message, ' . $name . '! We have received your inquiry about "' . $subject . '" and will get back to you at ' . $email . ' soon.'
        ]);
    } else {
        log_contact($name, $email, $subject, 'Error - Storage failed');
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error processing your message. Please try again or contact us directly at frjosephrichetti@gmail.com'
        ]);
    }
    
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>

<?php
// Fr. Joseph Richetti Catholic School - Contact Form Handler
// This script processes contact form submissions and sends emails to the school

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type for JSON response
header('Content-Type: application/json');

// School email configuration
$school_email = "frjosephrichetti@gmail.com";
$school_name = "Fr. Joseph Richetti Catholic School";

// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and validate input data
    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $subject = filter_var(trim($_POST['subject']), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST['message']), FILTER_SANITIZE_STRING);
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (!$email) {
        $errors[] = "Valid email address is required";
    }
    
    if (empty($subject)) {
        $errors[] = "Subject is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If there are validation errors
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fix the following errors: ' . implode(', ', $errors)
        ]);
        exit;
    }
    
    // Prepare email content
    $email_subject = "New Contact Form Submission: " . $subject;
    $email_body = "
    New message from Fr. Joseph Richetti Catholic School website:
    
    Name: $name
    Email: $email
    Subject: $subject
    
    Message:
    $message
    
    ---
    This message was sent from the school website contact form.
    Sender IP: " . $_SERVER['REMOTE_ADDR'] . "
    Time: " . date('Y-m-d H:i:s') . "
    ";
    
    // Email headers
    $headers = [
        'From: ' . $name . ' <' . $email . '>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    // Attempt to send email
    if (mail($school_email, $email_subject, $email_body, implode("\r\n", $headers))) {
        
        // Log successful submission (optional)
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from: $name ($email) - Subject: $subject\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you soon.'
        ]);
        
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again or contact us directly.'
        ]);
    }
    
} else {
    // If not a POST request
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>

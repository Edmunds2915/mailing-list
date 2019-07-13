<?php
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        
// Check that data was sent to the mailer.
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Set a 400 (bad request) response code and exit.
    http_response_code(400);
    echo "Oops! There was a problem with your submission. Please complete the form and try again.";
    exit;
}


include("connect.php");
$query = "INSERT INTO mailing_list (email) VALUES ('$email')";

try {
  $result = $myPDO->query($query);
  echo "You have been succesfully added to the mailing list.";
} catch (PDOException $e) {
  echo 'Connection failed: ' . $e->getMessage();
  exit;
}
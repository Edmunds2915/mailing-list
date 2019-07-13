<?php
require '/app/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


$mail = new PHPMailer(TRUE);
$mail->SMTPDebug = 2;

$mail->IsSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;
$mail->SMTPSecure = 'tls'; //read up on these protocols, eg SSL
$mail->SMTPAuth = true; //read up on SMTP too
$mail->Username = "devpurposes2@gmail.com";
$mail->Password = ""; //nice try chief
$mail->setFrom('devpurposes2@gmail.com', 'dev testing e-mail');


$mail->Subject = $_POST['email-subject'];
$mail->Body = $_POST['email-body'];

include("connect.php");
$execute = $myPDO->query("SELECT email FROM mailing_list"); //I don't like that $db_conn comes from the include one line above
$result = $execute->fetchAll();

//SEND TO ALL SUBSCRIBERS IN DB:
foreach ($result as $row) {
  $mail->addAddress($row['email']);
  if (!$mail->send()) {
      echo "Mailer Error (" . str_replace("@", "&#64;", $row["email"]) . ') ' . $mail->ErrorInfo . '<br />';
      break; //Abandon sending
  } else {
      echo "Message sent to : " . str_replace("@", "&#64;", $row['email']) . ')<br />';   
  }
  $mail->clearAddresses();
  $mail->clearAttachments();
}
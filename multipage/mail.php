<?php

    $to = "spn1@spondonit.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['fname'];
    $headers = "Content-type: text/html;From: $from";
    $subject = $_REQUEST['subject'];

    $fields = array();
    $fields["fname"] = $_REQUEST['fname'];
    $fields["email"] = $_REQUEST['email'];
    $fields["subject"] = $_REQUEST['subject'];
    $fields["message"] = $_REQUEST['message'];

    $body = "Here is what was sent:\n\n";
	$body .= 'First Name : '.$fields['fname']. '<br>';
	$body .= 'Email : '.$fields['email']. '<br>';
	$body .= 'Subject : '.$fields['subject']. '<br>';
	$body .= 'Message : '.$fields['message']. '<br>';

    $send = mail($to, $subject, $body, $headers);


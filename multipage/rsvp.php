<?php

    $to = "spn1@spondonit.com";
    $subject = 'Mail from RSVP form';

    $fields = array();
    $fields["yourname"] = $_POST['yourname'];
    $from = $fields["yourname"];
    $headers = "Content-type: text/html;From: $from";
    $fields["email"] = $_POST['email'];
    $fields["attending"] = $_POST['attending'];
    $fields["guest"] = $_POST['guest'];

    $body = "Here is what was sent:\n\n";
	$body .= 'Name : '.$fields['yourname']. '<br>';
	$body .= 'Email : '.$fields['email']. '<br>';
	$body .= 'Attending : '.$fields['attending']. '<br>';
	$body .= 'Guest : '.$fields['guest']. '<br>';

    $send = mail($to, $subject, $body, $headers);


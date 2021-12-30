<?php

    $to = "spn1@spondonit.com";
    $subject = 'Mail from restuarant reservation form';

    $fields = array();
    $headers = "Content-type: text/html;From: $from";

    $body = "Here is what was sent:\n\n";
	$body .= 'Date : '.$fields['date']. '<br>';
	$body .= 'Time : '.$fields['time']. '<br>';
	$body .= 'Person : '.$fields['person']. '<br>';

    $send = mail($to, $subject, $body, $headers);


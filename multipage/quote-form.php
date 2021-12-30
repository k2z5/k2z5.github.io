<?php

    $to = "spn1@spondonit.com";
    $from = $_REQUEST['email'];
    $name = $_REQUEST['fullname'];
    $headers = "Content-type: text/html;From: $from";
    $subject = 'Contacto web JDNuñez landing'.$_REQUEST['subject'];



    $fields = array();

    $fields["fullname"] = $_REQUEST['fullname'];
    $fields["email"] = $_REQUEST['email'];
    $fields["phone"] = $_REQUEST['phone'];
    $fields["message"] = $_REQUEST['message'];



    $body = "Here is what was sent:\n\n" . '<br>';
    $body .= 'Nombre : '.$fields['fullname']. '<br>';
    $body .= 'Email : '.$fields['email']. '<br>';
    $body .= 'Telefono : '.$fields['phone']. '<br>';
    $body .= 'Message : '.$fields['message']. '<br>';

    $send = mail($to, $subject, $body, $headers);


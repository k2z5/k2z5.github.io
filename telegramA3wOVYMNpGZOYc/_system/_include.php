<?php
date_default_timezone_set("Europe/Moscow");

ini_set('display_errors', "off");
ini_set('display_startup_errors', "off");

session_name('session');
session_start();

// время
$time = time();

include_once __DIR__.'/config.php';

include_once __DIR__.'/db.php';

include_once __DIR__.'/functions.php';

include_once __DIR__.'/Telegram.php';

<?php
include_once __DIR__.'/_system/_include.php';

$webHook = 'https://zverev.tk/telegramA3wOVYMNpGZOYc/bot.php';

$url = 'https://api.telegram.org/bot'.TG_TOKEN.'/setWebhook?url='.$webHook;

if ($result = curl($url)) {
    $result = json_decode($result);

    if ($result->ok === false) {
        echo 'Ошибка при установке обработчика '.$webHook.' - '.$result->description;
    } elseif ($result->ok === true) {
        echo 'Обработчик '.$webHook.' установлен';
    } else {
        echo 'Неизвестная ошибка';
    }
} else {
    echo 'Ошибка запроса для установки WebHook';
}

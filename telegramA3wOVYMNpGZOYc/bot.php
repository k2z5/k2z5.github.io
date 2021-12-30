<?php
include_once __DIR__.'/_system/_include.php';

$content = json_decode(file_get_contents("php://input"));

if (empty($content->message)) {
    exit;
}

$telegram = new Telegram(TG_TOKEN);

$message = $content->message;
$chat_id = $message->chat->id;
$text = isset($message->text) ? $message->text : null;
$contact = isset($message->contact) ? $message->contact : null;

$sql = DB::run("SELECT * FROM `telegram` WHERE `user_id` = ? ORDER BY `id` DESC LIMIT 1", [num($chat_id)]);

if ($sql->rowCount() == 0) {

    $keyboard = $telegram->replyKeyboardMarkup([$telegram->keyboardButton('Отправить номер телефона', true)], true, true);
    $r = $telegram->sendMessage($chat_id, 'Для регистрации разрешите доступ к номеру телефона', $keyboard);

    if ($r->ok === true) {
        DB::run("INSERT INTO `telegram` SET `user_id` = ?", [num($chat_id)]);
    }
} else {
    $user = $sql->fetch();

    if ($user['phone'] == '' && isset($contact)) {
        DB::run("UPDATE `telegram` SET `phone` = ? WHERE `id` = ? LIMIT 1", [$contact->phone_number, $user['id']]);

        foreach ($status as $key => $value) {
            $button[] = $telegram->keyboardButton($value);
        }

        $keyboard = $telegram->replyKeyboardMarkup($button);

        $r = $telegram->sendMessage($chat_id, 'Регистрация завершена', $keyboard);
    } elseif (isset($text)) {

        if ($key = array_search($text, $status)) {
            if ($user['status'] == '') {
                DB::run("UPDATE `telegram` SET `status` = ? WHERE `id` = ? LIMIT 1", [$key, $user['id']]);
            } else {
                DB::run("INSERT INTO `telegram` SET `user_id` = ?, `phone` = ?, `status` = ?, `times` = CURRENT_TIMESTAMP()", [$user['user_id'], $user['phone'], $key]);
            }
        } else {
                DB::run("INSERT INTO `telegram` SET `user_id` = ?, `phone` = ?, `status` = ?, `times` = CURRENT_TIMESTAMP()", [$user['user_id'], $user['phone'], $text]);
            /*if (array_key_exists($user['status'], $status)) {
                DB::run("INSERT INTO `telegram` SET `user_id` = ?, `phone` = ?, `status` = ?, `times` = CURRENT_TIMESTAMP()", [$user['user_id'], $user['phone'], $text]);
            } else {
                DB::run("UPDATE `telegram` SET `status` = ? WHERE `id` = ? LIMIT 1", [$text, $user['id']]);
            }*/
        }
    }
}


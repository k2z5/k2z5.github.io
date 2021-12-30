<?php

class Telegram
{
    public $token = null;

    public function __construct($token)
    {
        $this->token = $token;
    }

    public function api($method, $data)
    {
        return $this->curl($method, $data) ;
    }

    public function setWebHook($hookUrl)
    {
        return $this->sendPost('setWebHook', ['url' => $hookUrl]) ;
    }

    public function getUpdates()
    {
        return $this->curl('getUpdates', $data);
    }

    public function sendMessage($chat_id, $message, $keyboard = null, $noti = false)
    {
        $data['chat_id'] = $chat_id;
        $data['text'] = strip_tags($message);
        $data['disable_web_page_preview'] = true;
        $data['disable_notification'] = $noti;

        if (!empty($keyboard)) {
            $data['reply_markup'] = $keyboard;
        }

        return $this->curl('sendMessage', $data);
    }

    public function sendPhoto($chat_id, $photo, $noti = false)
    {
        $data['chat_id'] = $chat_id;
        $data['photo'] = $photo;
        $data['disable_notification'] = $noti;

        return $this->curl('sendPhoto', $data);
    }

    public function keyboardButton($text, $request_contact = false, $request_location = false){
        return [
                "text" => $text,
                "request_contact" => $request_contact,
                "request_location" => $request_location,
            ];
    }

    public function replyKeyboardMarkup($buttons, $resize_keyboard = true, $one_time_keyboard = false, $selective = false){

        $keyboard = [
                    "keyboard" => [$buttons],
                    "resize_keyboard" => $resize_keyboard,
                    "one_time_keyboard" => $one_time_keyboard,
                    "selective" => $selective
                ];

        return json_encode($keyboard);
    }

    private function curl($method, $data = [])
    {
    if( $curl = curl_init() ) {
        curl_setopt($curl, CURLOPT_URL, 'https://api.telegram.org/bot'.$this->token.'/'.$method);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 15);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        $out = curl_exec($curl);
        $return = json_decode($out);

//         print_r($return);
        curl_close($curl);

        return $return;
    }

    return false;
    }



}

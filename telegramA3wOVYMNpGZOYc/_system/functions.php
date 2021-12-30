<?php

function num($var)
{
    return abs(intval($var));
}

function curl($url, $post = null)
{
    if( $curl = curl_init() ) {
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 15);
        if (!empty($post)) {
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $post);
        }
        $out = curl_exec($curl);

        curl_close($curl);

        return $out;
    }

    return false;
}

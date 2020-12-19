<?php

require_once 'config.php';
require_once 'vendor/autoload.php';
// require_once './vendor/autoload.php';
$handle = curl_init();
$url = 'https://zoom.us/oauth/token';
$data = array(
    "grant_type" => "authorization_code",
    "code" => $_GET['code'],
    "redirect_uri" => REDIRECT_URI
);
$field = http_build_query($data);
$header = array(
    "Authorization" => "Basic ". base64_encode(CLIENT_ID.':'.CLIENT_SECRET)
);
// $head = json_encode($header);
curl_setopt($handle,CURLOPT_RETURNTRANSFER,1);
curl_setopt($handle,CURLOPT_URL,$url);
curl_setopt($handle,CURLOPT_POST,1);
curl_setopt($handle,CURLOPT_POSTFIELDS,$field);
curl_setopt($handle,CURLOPT_HTTPHEADER,$header);
curl_setopt($handle,CURLOPT_SSL_VERIFYPEER,false);
$server_output = curl_exec ($handle);
echo $server_output;
// echo json_encode($header);
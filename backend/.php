<?php
    try {
    
        $handle = curl_init();
        curl_setopt_array($handle,array(
            CURLOPT_URL => 'https://zoom.us',
            CURLOPT_SSL_VERIFYPEER => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $content
        ));
    
        $client = new Guzzle\Http\Client(['base_uri' => 'https://zoom.us']);
    
        $response = $client->request('POST', '/oauth/token', [
            "headers" => [
                "Authorization" => "Basic ". base64_encode(CLIENT_ID.':'.CLIENT_SECRET)
            ],
            'form_params' => [
                "grant_type" => "authorization_code",
                "code" => $_GET['code'],
                "redirect_uri" => REDIRECT_URI
            ],
        ]);
        
       
        $token = json_decode($response->getBody()->getContents(), true);
        
    
        $db = new DB();
     
        if($db->is_table_empty()) {
            $db->update_access_token(json_encode($token));
            echo "Access token inserted successfully.";
        }
    } catch(Exception $e) {
        echo $e->getMessage();
    }

    use Guzzle\Http\Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Psr7\Uri;

$clientID=CLIENT_ID;
$clientSecret=CLIENT_SECRET;
$content = "grant_type=authorization_code&code=$clientID&client_secret=$clientSecret";
$token_url="https://zoom.us/oauth/token";
$curl = curl_init();
curl_setopt_array($curl, array(
    CURLOPT_URL => $token_url,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $content
    ));
$response = curl_exec($curl);


	if ($response === false) {
    $retVal["Status"]=0;
		$retVal="Failed to retrieve code";
	} elseif (json_decode($response)->error) {
		$retVal["Status"]=0;
    $retVal["Message"]="Error: $response";
	} else {
    $retVal["Status"]=1;
    $retVal["Token"]=json_decode($response)->access_token;
}

	echo $retVal;




try {
    
    $handle = curl_init();
    curl_setopt_array($handle,array(
        CURLOPT_URL => 'https://zoom.us',
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $content
    ));

    $client = new Guzzle\Http\Client(['base_uri' => 'https://zoom.us']);

    $response = $client->request('POST', '/oauth/token', [
        "headers" => [
            "Authorization" => "Basic ". base64_encode(CLIENT_ID.':'.CLIENT_SECRET)
        ],
        'form_params' => [
            "grant_type" => "authorization_code",
            "code" => $_GET['code'],
            "redirect_uri" => REDIRECT_URI
        ],
    ]);
    
   
    $token = json_decode($response->getBody()->getContents(), true);
    

    $db = new DB();
 
    if($db->is_table_empty()) {
        $db->update_access_token(json_encode($token));
        echo "Access token inserted successfully.";
    }
} catch(Exception $e) {
    echo $e->getMessage();
}

// function getAccessToken() {

// }
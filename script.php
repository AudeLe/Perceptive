<?php

$command = $_GET['command'] ?: NULL;
$url = 'https://api.nasa.gov/neo/rest/v1/feed?';

if($command == 'fetch'){
    $start_date = $_GET['start_date'] ?: '2022-01-01';
    $end_date = $_GET['end_date'] ?: '2022-01-08';
    $api_key = 'DEMO_KEY';

    $post = 'start_date=' . $start_date . '&end_date=' . $end_date . '&api_key=' . $api_key . '';

    send_command($url, $post, $response);

    echo $response;

}

function send_command($url, $post, &$response){


    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_POSTFIELDS => $post,
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "cache-control: no-cache"
        ],
    ]);

    $response = curl_exec($ch);
    $err = curl_error($ch);

    return $response;
}
<?php

$command = $_GET['command'] ?: NULL;
$url = 'https://api.nasa.gov/neo/rest/v1/feed?';

if($command == 'fetch'){
    $results = [];

    $start_date = ($_GET['start_date'] !== NULL) ? $_GET['start_date'] : '2022-01-01';
    $end_date = ($_GET['end_date'] !== NULL) ? $_GET['end_date'] : '2022-01-08';
    $api_key = 'sQw5jfJKugnMWHIfKCiWNrtOYGB89eGzR5tpqr4g';

    $post = 'start_date=' . $start_date . '&end_date=' . $end_date . '&api_key=' . $api_key . '';

    $url = $url . $post;

    send_command($url, $response, $results);
    sort_results($response, $results);

    echo json_encode($results);

}

function send_command($url, &$response, &$results){


    $ch = curl_init();

    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_POSTFIELDS => "",
        CURLOPT_HTTPHEADER => [
            "Content-Type: application/json",
            "cache-control: no-cache"
        ],
    ]);


    $response = curl_exec($ch);
    $err = curl_error($ch) ?: NULL;
    if($err !== NULL){
        $results['status'] = 'fail';
    } else {
        $results['status'] = 'ok';
        $results['error'] = $err;
    }


    return [$response, $results];
}

function sort_results($response, &$results){

    $response = json_decode($response);

    if($response->near_earth_objects){
        // Loop through the dates
        foreach($response->near_earth_objects as $items){
            // Loop through the near earth objects themselves
            foreach($items as $item){
                if($item->is_potentially_hazardous_asteroid == TRUE){
                    $results['results'][] = $item;
                }
            }

        }
    }

    // Sorting the results ASC
    usort($results['results'],function($first,$second){
        return $first->close_approach_data[0]->epoch_date_close_approach > $second->close_approach_data[0]->epoch_date_close_approach;
    });

    return $results;
}


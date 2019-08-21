<?php

// overpass query
$overpass = 'http://overpass-api.de/api/interpreter?data=[out:json];area(3600046663)->.searchArea;(node["amenity"="drinking_water"](area.searchArea););out;';
$overpass = 'http://overpass-api.de/api/interpreter?data=[out:json];(area["ISO3166-1"="FR"];)->.searchArea;(node["repair"="assisted_self_service"](area.searchArea););out;';
// $overpass = 'http://overpass-api.de/api/interpreter?data=[out:json];(area["ISO3166-1"="FR"];)->.fr;((node["repair"~"assisted_self_service"](area.fr);way["repair"~"assisted_self_service"](area.fr);););out center;';

// collecting results in JSON format
$html = file_get_contents($overpass);
$jsonout = json_decode($html);
$fp = fopen('../cache_data.json', 'w');
fwrite($fp, $html);
fclose($fp);
// this line just checks what the query would give as output
var_dump($html);
/*
// ini_set('default_socket_timeout', 900);
$options = stream_context_create(array('http'=>
    array(
    'timeout' => 120 //120 seconds
    )
));
// https://www.overpass-api.de/api/interpreter?data=[out:json];(area["ISO3166-1"="FR"];)->.fr;((node["bulk_purchase"="only"](area.fr);way["bulk_purchase"="only"](area.fr);););out center;'
$url='https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];(area["ISO3166-1"="FR"];)->.fr;((node["repair"~"assisted_self_service"](area.fr);way["repair"~"assisted_self_service"](area.fr);););out center;';
// $url="https://openagenda.com/agendas/17121232/events.json";
$markersData = file_get_contents($url, false, $options);
// $markersData = file_get_contents("https://overpass-turbo.eu/s/EQ7");
$fp = fopen('cache_data2.json', 'w');
fwrite($fp, $markersData);
fclose($fp);
*/
?>

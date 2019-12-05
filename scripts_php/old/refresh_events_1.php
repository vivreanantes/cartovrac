<?php
// Coming
$eventsData = file_get_contents("https://openagenda.com/agendas/17121232/events.json");
// Include past
$eventsData = file_get_contents("https://openagenda.com/agendas/17121232/events.json?page=1&oaq%5Bpassed%5D=1");
$fp = fopen('../events.json', 'w');
fwrite($fp, $eventsData);
fclose($fp);
var_dump($eventsData);
?>

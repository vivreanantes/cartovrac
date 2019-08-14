<?php
// Coming
$eventsData = file_get_contents("http://coreparation44.fr/cache_data.json");

$data = json_decode($eventsData, true);
$id = 0;
foreach ($data["elements"] as $tag) {
	$result = get_opening_hours_date($data["elements"][$id]["tags"]["opening_hours"]);
	$data["elements"][$id]["tags"]["opening_hours_detailled"]=$result;
	$data["elements"][$id]["tags"]["id"]=$data["elements"][$id]["id"];
	if ($data["elements"][$id]["tags"]["addr:postcode"]) {
		$data["elements"][$id]["tags"]["contact:postcode"] = $data["elements"][$id]["tags"]["addr:postcode"];
	}
	if (substr($data["elements"][$id]["tags"]["contact:postcode"], 0, 2 )=="44") {
		$data["elements"][$id]["tags"]["department"] = "Loire-Atlantique";
	}
	$id++;
}

$json_data = json_encode($data);
file_put_contents('cache_data_2.json', $json_data);
var_dump($json_data);

function get_opening_hours_date($input) {

	$array_opening_hour = explode (";", $input);

	$array_result = array();
	foreach ($array_opening_hour as $opening_hour) {
		add_opening_hours($opening_hour, $array_result);
	}
	foreach ($array_opening_hour as $opening_hour) {
		remove_filter_opening_hours($opening_hour, $array_result);
	}

	format_day($array_result);
	return $array_result;

}

function remove_filter_opening_hours($input, &$array_result) {
	$array_of_input = explode(";", $input);
	foreach($array_of_input as $item_of_input) {
		
		if (strpos($item_of_input, " off")) {
			// echo " off found<br/>";
			//remove month
			if (strpos($item_of_input, "Jan")) { remove_one("Jan", $array_result); };
			if (strpos($item_of_input, "Feb")) { remove_one("Feb", $array_result); };
			if (strpos($item_of_input, "Mar")) { remove_one("Mar", $array_result); };
			if (strpos($item_of_input, "Apr")) { remove_one("Apr", $array_result); };
			if (strpos($item_of_input, "May")) { remove_one("May", $array_result); };
			if (strpos($item_of_input, "Aug")) { remove_one("Aug", $array_result); };
		}
	}
}

function remove_one($input, &$array_result) {
	foreach($array_result as $item_of_input) {
		// echo "item_of_input $item_of_input <br/>";
		if (strpos($item_of_input, $input)) {
			array_pop($array_result, $item_of_input);
		}
	}

}

function add_opening_hours($input, &$array_result) {

	$array_of_input = explode(" ", $input);
	foreach($array_of_input as $item_of_input) {
		if (strpos($item_of_input, "[0]") || strpos($item_of_input, "[1]") ||
			strpos($item_of_input, "[2]") || strpos($item_of_input, "[3]") || 
			strpos($item_of_input, "[4]") || strpos($item_of_input, "[5]") || 
			strpos($item_of_input, "[0]") || strpos($item_of_input, "[+]") || 
			strpos($item_of_input, "[7]") ) {
			add_specific_day($input, $array_result);
		}
		/*if (in_array($item_of_input, $healthy)) {
			add_specific_day($input, $array_result)
		}*/
	}

	// $id2 = 0;
	// foreach($pieces as $piece) {
	//	$piece = str_replace($healthy, $yummy, $piece);
	//	$piece = str_replace("[1]", "111111", $piece);
	//	$pieces[$id2] = $piece;
	//	$id2++;
	// }
	// return implode ( ";" , $pieces);
}


function add_specific_day($input, &$array_result) {
	$input = str_replace("[", " [", $input);
	$input = str_replace("]", "] ", $input);
	
	// [0] by first, [1] by second, [3] by third, [4] by fourth, [-1] by last
	$healthy = array("[0]", "[1]", "[2]", "[3]", "[4]", "[-1]");
	$yummy   = array("first", "second", "third", "fourth", "last");
	$counter_part = "";
	$array_of_input = explode(" ", $input);
	foreach($array_of_input as $item_of_input) {
		if (in_array($item_of_input, $healthy)) {
			$counter_part = str_replace($healthy, $yummy, $item_of_input);
			// echo "counter_part $counter_part <br/>";
		}
	}
	
	// [0] by first, [1] by second, [3] by third, [4] by fourth, [-1] by last
	$DayOfTheWeek2 = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	$DayOfTheWeekFull   = array("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
	$day_part = "";
	foreach($array_of_input as $item_of_input) {
		if (in_array($item_of_input, $DayOfTheWeek2)) {
			$day_part = str_replace($DayOfTheWeek2, $DayOfTheWeekFull, $item_of_input);
			// echo "day_part $day_part <br/>";
		}
	}
	$temp = $counter_part." ".$day_part." ";

	$hour_part = "";
	foreach($array_of_input as $item_of_input) {
		if (strpos($item_of_input, ":")) {
			$hour_part = " ".$item_of_input;
		}
	}

	// add 4 days

	// month 0
	$date0 = new DateTime();
	// date("YmdHi", $date0)." ".
	$aDate = date("d-M-Y", strtotime($date0->format('Y-m')));
	$aDate = $aDate.$hour_part;
	array_push($array_result, $aDate);
	// month 1
	$date1 = new DateTime();
	$date1->add(new DateInterval('P1M'));
	// date("YmdHi", $date1)." ".
	$aDate = date("d-M-Y", strtotime($date1->format('Y-m')));
	$aDate = $aDate.$hour_part;
	array_push($array_result, $aDate);
	// month 2
	$date2 = new DateTime();
	$date2->add(new DateInterval('P2M'));
	// date("YmdHi", $date2)." ".
	$aDate = date("d-M-Y", strtotime($date2->format('Y-m')));
	$aDate = $aDate.$hour_part;
	array_push($array_result, $aDate);
	// month 3
	$date3 = new DateTime();
	$date3->add(new DateInterval('P3M'));
	// date("YmdHi", $date3)." ".
	$aDate = date("d-M-Y", strtotime($date3->format('Y-m')));
	$aDate = $aDate.$hour_part;
	array_push($array_result, $aDate);
}


function format_day(&$array_result) {
	// $healthy = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	// $yummy   = array("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
	
	$months3 = array ('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
    $monthsFull = array('Janvier','Février','Mars','Avril','Mai','Juin','Juillet ','Apût','Septembre','Octobre','Novembre','Décembre');

	foreach($array_result as $item_of_input) {
		$item_of_input_2 = str_replace($months3, $monthsFull, $item_of_input);
		array_pop($array_result, $item_of_input);
		array_push($array_result, $item_of_input_2);
	}
}

/*
function getDay($OpeningDay, $Month, $Year) {
	$DayOfTheWeek = array("Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun");
	$AValuePerDay   = array(7, 6, 5, 4, 3, 2, 1);
	$DayOfTheWeek2 = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	$NumDayOfWeek   = array(1, 2, 3, 4, 5, 6, 7);
	
	$DayOfOpeningDay=substr($OpeningDay, 0, 2);
	$NumWeekOfOpeningDay=substr($OpeningDay, 3, 1);
	
	$Day="01"; // no matter

	$date = $Day."-".$Month."-".$Year;
    $nameOfDay = date('D', strtotime($date)); // ouput is "Mo"... "Su"
	// echo "nameOfDay : ".$nameOfDay." --- ";
	$NumOfFirstDayOfMonth = str_replace($DayOfTheWeek, $AValuePerDay, $nameOfDay); // output is "4" if day is "Fr"
	// echo "ValueOfFirstDayOfMonth (".$date.") : ".$NumOfFirstDayOfMonth." --- ";
	
	$NumOfWantedDay = str_replace($DayOfTheWeek2, $NumDayOfWeek, $DayOfOpeningDay);
	// echo "ValueOfWantedDay for ".$OpeningDay." : ".$NumOfWantedDay." --- ";
	
	$temp = $NumOfWantedDay+$NumOfFirstDayOfMonth;
	// echo "result before : ".$temp." --- ";
	if ($temp>7) { $temp = $temp-7; }
	// echo "result middle : ".$temp." --- ";
	// echo "NumWeekOfOpeningDay : ".$NumWeekOfOpeningDay." --- ";

	$temp = $temp + $NumWeekOfOpeningDay*7;	
	echo "result after : ".$temp."-".$Month."-".$Year." ------ ";
}
*/
?>

<?php
// Coming
$eventsData = file_get_contents("http://coreparation44.fr/cache_data.json");

echo "export refresh_events2.php<br/>";
$data = json_decode($eventsData, true);
$id = 0;
foreach ($data["elements"] as $tag) {
	$result = get_opening_hours_date($data["elements"][$id]["tags"]["opening_hours"]);
	$data["elements"][$id]["tags"]["opening_hours_detailled"]=$result;
	$data["elements"][$id]["tags"]["id"]=$data["elements"][$id]["id"];
	/*if ($data["elements"][$id]["tags"]["addr:postcode"]) {
		$data["elements"][$id]["tags"]["contact:postcode"] = $data["elements"][$id]["tags"]["addr:postcode"];
	}
	if ($data["elements"][$id]["tags"]["website"]) {
		$data["elements"][$id]["tags"]["contact:website"] = $data["elements"][$id]["tags"]["website"];
	}
	if ($data["elements"][$id]["tags"]["facebook"]) {
		$data["elements"][$id]["tags"]["contact:facebook"] = $data["elements"][$id]["tags"]["facebook"];
	}
	if ($data["elements"][$id]["tags"]["facebook"]) {
		$data["elements"][$id]["tags"]["contact:facebook"] = $data["elements"][$id]["tags"]["facebook"];
	}
	if ($data["elements"][$id]["tags"]["email"]) {
		$data["elements"][$id]["tags"]["contact:email"] = $data["elements"][$id]["tags"]["email"];
	}
	if ($data["elements"][$id]["tags"]["phone"]) {
		$data["elements"][$id]["tags"]["contact:phone"] = $data["elements"][$id]["tags"]["phone"];
	}
	*/
	if (substr($data["elements"][$id]["tags"]["contact:postcode"], 0, 2 )=="44") {
		$data["elements"][$id]["tags"]["department"] = "Loire-Atlantique";
	}
	$id++;
}

$json_data = json_encode($data);

format_days($json_data);
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

	return $array_result;

}

function remove_filter_opening_hours($input, &$array_result) {
	
	echo "remove_filter_opening_hours ".count($array_result)."<br/>";
	
	$array_of_input = explode(";", $input);
	foreach($array_of_input as $item_of_input) {
		
		echo "remove_filter_opening_hours item_of_input $item_of_input<br/>";
		
		if (strpos($item_of_input, " off")) {
			//remove month
			if (strpos($item_of_input, "Jan")) { remove_one("Jan", $array_result); };
			if (strpos($item_of_input, "Feb")) { remove_one("Feb", $array_result); };
			if (strpos($item_of_input, "Mar")) { remove_one("Mar", $array_result); };
			if (strpos($item_of_input, "Apr")) { remove_one("Apr", $array_result); };
			if (strpos($item_of_input, "May")) { remove_one("May", $array_result); };
			if (strpos($item_of_input, "Aug")) { remove_one("Aug", $array_result); };
			// remove SH
			if (strpos($item_of_input, "SH ")) { remove_school_holidays($array_result); };
			// remove PH
			if (strpos($item_of_input, "PH ")) { remove_public_hodidays($array_result); };
		}
	}
}

function remove_one($input, &$array_result) {
	
	echo "remove_one begin ".count($array_result)." <br/>";
	$array_result_temp = array();
		
	foreach($array_result as $item_of_input) {
		if (strpos($item_of_input, $input)===false) {
			
			array_push($array_result_temp, $item_of_input);
		} else {
			echo "remove_one item_of_input $item_of_input <br/>";
		}
	}
	$array_result = $array_result_temp;
	echo "remove_one end ".count($array_result)." <br/>";
}

function remove_public_hodidays(&$array_result) {
	
	// echo "remove_public_hodidays begin ".count ($array_result)."<br/>";
	
	$array_result_temp = array();
	$array_holidays = getHolidays();
	foreach($array_result as $item_of_input) {
		if (in_array( substr($item_of_input, 0, 11), $array_holidays)===false) {
			array_push($array_result_temp, $item_of_input);
		} else {
			echo "remove_public_hodidays item_of_input $item_of_input <br/>";
		}
	}
	$array_result = $array_result_temp;
	echo "remove_public_hodidays end ".count($array_result)." <br/>";
}

function remove_school_holidays(&$array_result) {
	
	$array_result_temp = array();
	/*
	foreach($array_result as $item_of_input) {
		if (strpos($item_of_input, $input)===false) {
			array_push($array_result_temp, $item_of_input);
		} else {
			echo "remove_one item_of_input $item_of_input <br/>";
		}
	}*/
	//$array_result = $array_result_temp;
}

// input is Tu[3] 18:00-20:30
function add_opening_hours($input, &$array_result) {

   echo "add_opening_hours '$input'<br/>";
	
	// $array_of_input = explode(" ", $input);

	// foreach($array_of_input as $item_of_input) {

	// echo "add_opening_hours item $item_of_input<br/>";
		
		if (strpos($input, "[0]") || strpos($input, "[1]") ||
			strpos($input, "[2]") || strpos($input, "[3]") || 
			strpos($input, "[4]") || strpos($input, "[5]") || 
			strpos($input, "[6]") || strpos($input, "[-1]") ) {
			add_specific_day_1_day_per_month($input, $array_result);
		} else if (strpos($input, "[")!==false && 
					(strpos($input, "[")+3)<(strpos($input, "]"))) {
			add_specific_day_several_days_per_month($input, $array_result);
		}
		else {
			add_specific_day_a_day_per_week($input, $array_result);
		}
	// }
}

// Th[1,3]
function add_specific_day_several_days_per_month($input, &$array_result) {
	
	 echo "add_specific_day_several_days_per_month '$input'<br/>";
	 
	$array_result_temp = array();
	$input=trim($input); // remove blank space

	$day=substr($input, 0, 2);
	$dayofmonth1=substr($input, 3, 1);
	$dayofmonth2=substr($input, 5, 1);
	$time=substr($input, 9);
	
	 echo "add_specific_day_several_days_per_month '$day' '$dayofmonth1' '$dayofmonth2'<br/>";
	 
	add_specific_day($day."[".$dayofmonth1."]"." ".$time, $array_result_temp);
	add_specific_day($day."[".$dayofmonth2."]"." ".$time, $array_result_temp);
	
	ksort($array_result_temp);
	foreach($array_result_temp  as $key => $value) {
		echo "array_push $value <br/";
		array_push($array_result, $value);
	}
}

// Th[1]
function add_specific_day_1_day_per_month($input, &$array_result) {
	
	 echo "add_specific_day_1_day_per_month '$input'<br/>";
	
	$array_result_temp = array();
	add_specific_day($input, $array_result_temp);
	
	ksort($array_result_temp);
	foreach($array_result_temp  as $key => $value) {
		echo "array_push $value <br/";
		array_push($array_result, $value);
	}
}


function add_specific_day($input, &$array_result_temp) {

	echo "add_specific_day $input<br/>";

	if (strpos($input, "[-1]")!==false) {
		echo "[-1] $input<br/>";
	}
	$input = str_replace("[", " [", $input);
	$input = str_replace("]", "] ", $input);
	
	// [0] by first, [1] by second, [3] by third, [4] by fourth, [-1] by last
	$healthy = array("[1]", "[2]", "[3]", "[4]", "[-1]");
	$yummy   = array("first", "second", "third", "fourth", "last");
	$counter_part = "";
	$array_of_input = explode(" ", $input);
	foreach($array_of_input as $item_of_input) {
		if (in_array($item_of_input, $healthy)) {
			$counter_part = str_replace($healthy, $yummy, $item_of_input);
		}
	}
	
	// Mo by monday...
	$DayOfTheWeek2 = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	$DayOfTheWeekFull   = array("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
	$day_part = "";
	foreach($array_of_input as $item_of_input) {
		if (in_array($item_of_input, $DayOfTheWeek2)) {
			$day_part = str_replace($DayOfTheWeek2, $DayOfTheWeekFull, $item_of_input);
		}
	}
	
	$temp = $counter_part." ".$day_part." ";
	echo "temp $temp<br/>";

	$hour_part = "";
	foreach($array_of_input as $item_of_input) {
		if (strpos($item_of_input, ":")) {
			$hour_part = " ".$item_of_input;
		}
	}

	// add 2 months

	// month 0
	$date0 = new DateTime();
	// date("YmdHi", $date0)." ".
	$aDate = date("d-M-Y", strtotime("$temp of this month"));
	$key = date("Y-m-d", strtotime("$temp of this month"));
	$aDate = $aDate.$hour_part;
	// array_push($array_result, $aDate);
	$array_result_temp[$key] = $aDate;
	
	// month 1
	$date1 = new DateTime();
	$date1->add(new DateInterval('P1M'));
	// date("YmdHi", $date1)." ".
	$aDate = date("d-M-Y", strtotime("$temp of next month"));
	$key = date("Y-m-d", strtotime("$temp of next month"));
	$aDate = $aDate.$hour_part;
	// array_push($array_result, $aDate);
	$array_result_temp[$key] = $aDate;

}


function add_specific_day_a_day_per_week($input, &$array_result) {

	$array_result_temp = array();
	
	echo "add_specific_day_a_day_per_week $input<br/>";
	
	if (strpos($input, "[")>0) {
		return;
	}

	if (strpos($input, "Mo,")===false && strpos($input, "Mo-")===false && strpos($input, "Mo ")===false &&
		strpos($input, "Tu,")===false && strpos($input, "Tu-")===false && strpos($input, "Tu ")===false &&
		strpos($input, "We,")===false && strpos($input, "We-")===false && strpos($input, "We ")===false &&
		strpos($input, "Th,")===false && strpos($input, "Th-")===false && strpos($input, "Th ")===false &&
		strpos($input, "Fr,")===false && strpos($input, "Fr-")===false && strpos($input, "Fr ")===false &&
		strpos($input, "Sa,")===false && strpos($input, "Sa-")===false && strpos($input, "Sa ")===false &&
		strpos($input, "Su,")===false && strpos($input, "Su-")===false && strpos($input, "Su ")===false ) {
			return;
	}

	$array_of_input = explode(" ", $input);
	
	// Mo by monday...
	$DayOfTheWeek2 = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	$DayOfTheWeekFull   = array("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
	$day_part = "";
	foreach($array_of_input as $item_of_input) {
		if (in_array($item_of_input, $DayOfTheWeek2)) {
			$day_part = str_replace($DayOfTheWeek2, $DayOfTheWeekFull, $item_of_input);
		}
	}

	$hour_part = "";
	foreach($array_of_input as $item_of_input) {
		if (strpos($item_of_input, ":")) {
			$hour_part = " ".$item_of_input;
		}
	}

	echo "push 8 days $day_part<br/>";
	push_a_day($array_result_temp, "first $day_part of this month", $hour_part);
	push_a_day($array_result_temp, "second $day_part of this month", $hour_part);
	push_a_day($array_result_temp, "third $day_part of this month", $hour_part);
	push_a_day($array_result_temp, "fourth $day_part of this month", $hour_part);
	push_a_day($array_result_temp, "first $day_part of next month", $hour_part);
	push_a_day($array_result_temp, "second $day_part of next month", $hour_part);
	push_a_day($array_result_temp, "third $day_part of next month", $hour_part);
	push_a_day($array_result_temp, "fourth $day_part of next month", $hour_part);
	
	ksort($array_result_temp);
	foreach($array_result_temp  as $key => $value) {
		echo "array_push $value <br/";
		array_push($array_result, $value);
	}
	// array_push($array_result, $values);
}

function push_a_day(&$array_result_temp, $delay, $hour_part) {
	$aDate = date("d-M-Y", strtotime($delay));
	$key = date("Y-m-d", strtotime($delay));
	$aDate = $aDate.$hour_part;
	// array_push($array_result, $aDate);
	$array_result_temp[$key] = $aDate;
}



function format_days(&$json) {
	// $DayOfTheWeek2 = array("Mo", "Tu", "We", "Th", "Fr", "Sa", "Su");
	// $DayOfTheWeekFull   = array("monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday");
	// $yummy   = array("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche");
	
	$months3 = array ('-Jan-','-Feb-','-Mar-','-Apr-','-May-','-Jun-','-Jul-','-Aug-','-Sep-','-Oct-','-Nov-','-Dec-');
    $monthsFull = array(' Janvier ',' Février ',' Mars ',' Avril ',' Mai ',' Juin ',' Juillet  ',' Août ',' Septembre ',' Octobre ',' Novembre ',' Décembre ');

	$json = str_replace($months3, $monthsFull, $json);
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


function getHolidays()
{
	$holidays = array("01-Jan-2019", "22-Apr-2019", "01-May-2019", "08-May-2019", "30-May-2019", "10-Jun-2019", "14-Jul-2019", "15-Aug-2019", "01-Nov-2019", "11-Nov-2019", "25-Dec-2019");
	/*
        $easterDate = easter_date($year);
        $easterDay = date('j', $easterDate);
        $easterMonth = date('n', $easterDate);
        $easterYear = date('Y', $easterDate);

       $holidays = array(
                // Jours feries fixes
				date_format($year."-01-01","d-m-Y"),
				date_format($year."-05-01","d-m-Y"),
				date_format($year."-08-01","d-m-Y"),
				date_format($year."-01-01","d-m-Y"),
				date_format($year."-01-01","d-m-Y"),
				date_format($year."-01-01","d-m-Y"),
				date_format($year."-01-01","d-m-Y")
                mktime(0, 0, 0, 1, 1, $year),// 1er janvier
                mktime(0, 0, 0, 5, 1, $year),// Fete du travail
                mktime(0, 0, 0, 5, 8, $year),// Victoire des allies
                mktime(0, 0, 0, 7, 14, $year),// Fete nationale
                mktime(0, 0, 0, 8, 15, $year),// Assomption
                mktime(0, 0, 0, 11, 1, $year),// Toussaint
                mktime(0, 0, 0, 11, 11, $year),// Armistice
                mktime(0, 0, 0, 12, 25, $year),// Noel

                // Jour feries qui dependent de paques
                mktime(0, 0, 0, $easterMonth, $easterDay + 1, $easterYear),// Lundi de paques
                mktime(0, 0, 0, $easterMonth, $easterDay + 39, $easterYear),// Ascension
                mktime(0, 0, 0, $easterMonth, $easterDay + 50, $easterYear), // Pentecote
        );
        sort($holidays);

print_r($holidays);*/

        return $holidays;
}
?>

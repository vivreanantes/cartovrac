
    var getQueryParam = function(param) {
      var found;
      window.location.search.substr(1).split("&").forEach(function(item) {
        if (param == item.split("=")[0]) {
          found = item.split("=")[1];
        }
      });
      return found;
    };

    var load_json_2 = function(type_event) {

      var today = new Date();
      var textDiv2 = "";

      if (Array.isArray(type_event)) {
        var cptEventsFiltered = 0;
		
                 for (var cptEventsNotFiltered = 0; cptEventsNotFiltered < type_event.length; cptEventsNotFiltered++) {
                     var show = true;
					 if (type_event[cptEventsNotFiltered].tags["department"] !== "Loire-Atlantique") {
                         show = false;
                       }
	  /*
                     if (window.location.href.indexOf("coreparation44.fr") > -1) {
                       // Url is coreparation44
                       if (type_event[cptEventsNotFiltered].department!="Loire-Atlantique") {
                         show = false;
                       }
                     }*/
					 
                     if (show==true) {
                       cptEventsFiltered++;
                       textDiv2 += "<div class='ligne'>"; // ligne
					   textDiv2 += "<a id='calendar_repair-bistrot-par-la-recyclerie-le-grenier'>&nbsp;</a>";
					   textDiv2 += "<div class='wrap'>"; // wrap
					   // image
			           textDiv2 += "<div class='truc'>"; // truc
					   textDiv2 += "<span class='image'>"; // image
						if (typeof type_event[cptEventsNotFiltered].tags["image"] == "undefined") {
                         textDiv2 += "&nbsp;";
                       }
                       else {
                         textDiv2 += "<img src='"+type_event[cptEventsNotFiltered].tags["image"]+"' width='200px' style='width=100%;max-width:100%;height:auto' />";
                       }
                       textDiv2 += "</span>"; // end image
					   textDiv2 += "</div>"; // end truc
					   
					   // 
					   textDiv2 += "<div class='truc'>"; // truc
					   
					   textDiv2 += "<div class='event_title'>"; // event_title
                       textDiv2 += type_event[cptEventsNotFiltered].tags["name"];
					   textDiv2 += "</div>"; // end event_title
					   
					   textDiv2 += "<div class='event_conditions'>"; // event_conditions
					   
                       textDiv2 += "<address>"; // address

					   if (typeof type_event[cptEventsNotFiltered].tags["contact:housenumber"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:housenumber"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["addr:housenumber"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["addr:housenumber"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["contact:street"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:street"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["addr:street"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["addr:street"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["contact:postcode"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:postcode"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["addr:postcode"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["addr:postcode"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["contact:city"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:city"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["addr:city"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["addr:city"]+" ";
                       }
                       textDiv2 += "</address>";  // end address
					   

					   if (typeof type_event[cptEventsNotFiltered].tags["contact:phone"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:phone"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["phone"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["phone"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["contact:email"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["contact:email"]+" ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["email"] !== "undefined") {
                         textDiv2 += type_event[cptEventsNotFiltered].tags["email"]+" ";
                       }
 
					   textDiv2 += "</div>"; // event_conditions
					   

					   // Dates
					   textDiv2 += "<div class='event_conditions'>"; // event_conditions
					    textDiv2 +=  type_event[cptEventsNotFiltered].tags["description"]+"</br/>";
						textDiv2 += "<div class='timeDate'>"; // timeDate
						var nbEvent = 0;
						for(var cptDateOfTheEvent = 0; cptDateOfTheEvent < type_event[cptEventsNotFiltered].tags["opening_hours_detailled"].length; cptDateOfTheEvent++) {
						 textDiv2 += type_event[cptEventsNotFiltered].tags["opening_hours_detailled"][cptDateOfTheEvent] + "<br/>";
						 nbEvent++;
                       }
                       if (nbEvent==0) {
                          textDiv2 += "Pas de date à venir programmée.";
                       }
					   textDiv2 += "</div><br/>"; // end of timeDate
					   if (typeof type_event[cptEventsNotFiltered].tags["website"] !== "undefined") {
                         textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["website"]+"' target=_new><b><i>Site internet</i></b></a> ";
                       }
					   if (typeof type_event[cptEventsNotFiltered].tags["contact:website"] !== "undefined") {
                         textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["contact:website"]+"' target=_new><b><i>Site internet</i></b></a> ";
                       }
					   
					   textDiv2 += "</div>";   // end of event_conditions
					   textDiv2 += "</div>"; // end of truc
					   
					   textDiv2 += "</div>";   // end of wrap
					   textDiv2 += "</div>"; // end of ligne
					   
					   if(cptEventsFiltered%2 == 0){
                         textDiv2 += "<div class='clear'></div>";
                       }
					   /*
                       if(cptEventsFiltered%2 == 1){
                         textDiv2 += "<a id='calendar_" + type_event[cptEventsNotFiltered].tags["id"] + "'>&nbsp</a>";
                       } else {
                         textDiv2 += "<a id='calendar_" + type_event[cptEventsNotFiltered].tags["id"] + "'></a>";
                       }
                       textDiv2 += "<div class='wrap'><div class='truc'><span class='image'>";
						if (typeof type_event[cptEventsNotFiltered].tags["image"] == "undefined") {
                         textDiv2 += "&nbsp;";
                       }
                       else {
                         textDiv2 += "<img src='"+type_event[cptEventsNotFiltered].tags["image"]+"' ' style='width='100%;max-width:100%;height:auto' />";
                       }
                       textDiv2 += "</span></div>";
					   */
                      /* textDiv2 += "<div class='truc'><div class='event_title'>"+type_event[cptEventsNotFiltered].tags["name"]+"</div>"
                      textDiv2 +=  type_event[cptEventsNotFiltered].tags["description"]+"</br/><div class='timeDate'>";
                       
                       for(var cptDateOfTheEvent = 0; cptDateOfTheEvent < type_event[cptEventsNotFiltered].tags["opening_hours_detailled"].length; cptDateOfTheEvent++) {
						 textDiv2 += type_event[cptEventsNotFiltered].tags["opening_hours_detailled"][cptDateOfTheEvent] + "<br/>";
                       }
                       if (nbEvent==0) {
                          textDiv2 += "Pas de date à venir programmée.";
                       }
					   textDiv2 += "</div><br/>";
                      
                       if (type_event[cptEventsNotFiltered].conditions != null) {
                         textDiv2 += "<div class='event_conditions'>Conditions : " + type_event[cptEventsNotFiltered].tags["conditions"]+"</div>";
                       
                       textDiv2 += "<br/><a href='" + type_event[cptEventsNotFiltered].tags["contact:website"]+ "' target=_new><b><i>Plus d'infos</i></b></a>";
                       textDiv2 += "</div></div>";
                       textDiv2 += "</div>";


					   
                     }*/
					 }
      }

    }
    document.getElementById("textDiv2").innerHTML = textDiv2;
	  
    }

$.getJSON("scripts_php/cache_data_2.json", function (data) {
    $.each(data, function (index, value) {
              load_json_2(value);
    });
});

if (window.location.href.indexOf("coreparation44.fr") > -1) {
  // OK !!!!!!!
    // Url is coreparation44 : je montre
    document.getElementById("filterCalendar44").style.display = 'inline-block';
} else {
      document.getElementById("filterCalendar44").style.display = 'none';
}

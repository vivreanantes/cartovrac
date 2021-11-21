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
      /*if (type_event[cptEventsNotFiltered].tags["department"] !== "Loire-Atlantique" &&
						type_event[cptEventsNotFiltered].tags["department"] !== "Maine-Et-Loire" &&
						type_event[cptEventsNotFiltered].tags["department"] !== "Mayenne" &&
						type_event[cptEventsNotFiltered].tags["department"] !== "Sarthe" &&
						type_event[cptEventsNotFiltered].tags["department"] !== "Vend\u00e9e") {
                         show = false;
                       }*/
      /*
                     if (window.location.href.indexOf("coreparation.fr") > -1) {
                       // Url is coreparation
                       if (type_event[cptEventsNotFiltered].department!="Loire-Atlantique") {
                         show = false;
                       }
                     }*/

      if (show == true) {
        cptEventsFiltered++;
        textDiv2 += "<div class='ligne'>"; // ligne
        textDiv2 += "<a id='calendar_" + type_event[cptEventsNotFiltered].tags["id"] + "'>&nbsp;</a>";
        textDiv2 += "<div class='wrap'>"; // wrap
        // image
        textDiv2 += "<div class='truc'>"; // truc
        textDiv2 += "<span class='image'>"; // image
        if (typeof type_event[cptEventsNotFiltered].tags["image"] == "undefined") {
          textDiv2 += "&nbsp;";
        } else {
          // pour éviter d'importer des images en http
          textDiv2 += "<img src='" + type_event[cptEventsNotFiltered].tags["image"].replace('http:', 'https:') + "' width='200px' style='width=100%;max-width:100%;height:auto' />";
          // textDiv2 += "<img src='" + type_event[cptEventsNotFiltered].tags["image"] + "' width='200px' style='width=100%;max-width:100%;height:auto' />";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["mapillary"] == "undefined") {
          textDiv2 += "&nbsp;";
        } else {
          // https://d1cuyjsrcm0gby.cloudfront.net/{mapillary}/thumb-640.jpg
          textDiv2 += "<img src='https://d1cuyjsrcm0gby.cloudfront.net/" + type_event[cptEventsNotFiltered].tags["mapillary"] + "/thumb-640.jpg' width='200px' style='width=100%;max-width:100%;height:auto' />";
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

        if (typeof type_event[cptEventsNotFiltered].tags["housename"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["housename"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:housename"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:housename"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["addr:housename"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["addr:housename"] + " ";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["housenumber"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["housenumber"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:housenumber"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:housenumber"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["addr:housenumber"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["addr:housenumber"] + " ";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["street"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["street"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:street"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:street"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["addr:street"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["addr:street"] + " ";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["contact:postcode"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:postcode"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:postcode"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:postcode"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["addr:postcode"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["addr:postcode"] + " ";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["city"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["city"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:city"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:city"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["addr:city"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["addr:city"] + " ";
        }
        textDiv2 += "</address>"; // end address

        if (typeof type_event[cptEventsNotFiltered].tags["phone"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["phone"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:phone"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:phone"] + " ";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["email"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["email"] + " ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:email"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["contact:email"] + " ";
        }

        textDiv2 += "</div>"; // event_conditions


        // Dates
        textDiv2 += "<div class='event_conditions'>"; // event_conditions
        if (typeof type_event[cptEventsNotFiltered].tags["description"] !== "undefined") {
          textDiv2 += type_event[cptEventsNotFiltered].tags["description"] + "</br/>";
        }
        textDiv2 += "<div class='timeDate'>"; // timeDate
        if (typeof type_event[cptEventsNotFiltered].tags["opening_hours"] !== "undefined") {
          textDiv2 += "(<i>" + type_event[cptEventsNotFiltered].tags["opening_hours"] + "</i>)<br/>";
        }
        var nbEvent = 0;
        for (var cptDateOfTheEvent = 0; cptDateOfTheEvent < type_event[cptEventsNotFiltered].tags["opening_hours_detailled"].length; cptDateOfTheEvent++) {
          textDiv2 += type_event[cptEventsNotFiltered].tags["opening_hours_detailled"][cptDateOfTheEvent] + "<br/>";
          nbEvent++;
        }
        if (nbEvent == 0) {
          if (typeof type_event[cptEventsNotFiltered].tags["contact:calendar"] !== "undefined") {
            textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["contact:calendar"] + "' target=_new><b><i>Voir les détails sur le calendrier</i></b></a> ";
          } else {
            textDiv2 += "Consulter le site pour avoir les dates.";
          }
        }
        textDiv2 += "</div><br/>"; // end of timeDate
        if (typeof type_event[cptEventsNotFiltered].tags["website"] !== "undefined") {
          textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["website"] + "' target=_new><b><i>Site internet</i></b></a> ";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:website"] !== "undefined") {
          textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["contact:website"] + "' target=_new><b><i>Site internet</i></b></a><br/>";
        }
        if (typeof type_event[cptEventsNotFiltered].tags["facebook"] !== "undefined") {
          textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["facebook"] + "' target=_new><b><i>Facebook</i></b></a><br/>";
        }
        else if (typeof type_event[cptEventsNotFiltered].tags["contact:facebook"] !== "undefined") {
          textDiv2 += "<a href='" + type_event[cptEventsNotFiltered].tags["contact:facebook"] + "' target=_new><b><i>Facebook</i></b></a><br/>";
        }
        textDiv2 += "<br/>";
        if (typeof type_event[cptEventsNotFiltered].tags["source"] !== "undefined") {
          textDiv2 += "Source : " + type_event[cptEventsNotFiltered].tags["source"] + "<br/>";
        }
        textDiv2 += "<a href='https://openstreetmap.org/node/" + type_event[cptEventsNotFiltered].id + "' target=_new>Modifier ces informations</a><br/>";
        textDiv2 += "</div>"; // end of event_conditions
        textDiv2 += "</div>"; // end of truc

        textDiv2 += "</div>"; // end of wrap
        textDiv2 += "</div>"; // end of ligne

        if (cptEventsFiltered % 2 == 0) {
          textDiv2 += "<div class='clear'></div>";
        }
      }
    }

  }
  document.getElementById("textDiv2").innerHTML = textDiv2;

}

$.getJSON("cache_data.json", function(data) {
  $.each(data, function(index, value) {
    load_json_2(value);
  });
});

/*if (window.location.href.indexOf("coreparation.fr") > -1) {
  // OK !!!!!!!
    // Url is coreparation : je montre
    document.getElementById("filterCalendar44").style.display = 'inline-block';
} else {
      document.getElementById("filterCalendar44").style.display = 'none';
}*/

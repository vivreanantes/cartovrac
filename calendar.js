
    var getQueryParam = function(param) {
      var found;
      window.location.search.substr(1).split("&").forEach(function(item) {
        if (param == item.split("=")[0]) {
          found = item.split("=")[1];
        }
      });
      return found;
    };

    var load_json = function(type_event) {

      var weekday = new Array(7);
            weekday[0] =  "Dim.";
            weekday[1] = "Lundi";
            weekday[2] = "Mardi";
            weekday[3] = "Merc.";
            weekday[4] = "Jeudi";
            weekday[5] = "Vend.";
            weekday[6] = "Samedi";

var today = new Date();
      var textDiv = "";
      if (Array.isArray(type_event)) {
        var cptEventsFiltered = 0;
                 for (var cptEventsNotFiltered = 0; cptEventsNotFiltered < type_event.length; cptEventsNotFiltered++) {
                     var show = true;

                     if (window.location.href.indexOf("coreparation.fr") > -1) {
                       // Url is coreparation
                       if (type_event[cptEventsNotFiltered].department!="Loire-Atlantique") {
                         show = false;
                       }
                     }
                     if (show==true) {
                       cptEventsFiltered++;
                       textDiv += "<div class='ligne'>";
                       if(cptEventsFiltered%2 == 1){
                         textDiv += "<a id='calendar_" + type_event[cptEventsNotFiltered].slug + "'>&nbsp</a>";
                       } else {
                         textDiv += "<a id='calendar_" + type_event[cptEventsNotFiltered].slug + "'></a>";
                       }
                       textDiv += "<div class='wrap'><div class='truc'><span class='image'>";
                       if (type_event[cptEventsNotFiltered].thumbnail == false) {
                         textDiv += "&nbsp;";
                       }
                       else {
                         textDiv += "<img src='"+type_event[cptEventsNotFiltered].thumbnail+"' ' style='width='100%;max-width:100%;height:auto' />";
                       }
                       textDiv += "</span></div>";
                       textDiv += "<div class='truc'><div class='event_title'>"+type_event[cptEventsNotFiltered].title.fr+"</div>"
                       /*if (typeof type_event[cptEventsNotFiltered].keywords !== "undefined") {
                         textDiv += "<br/><br/><i>"+type_event[cptEventsNotFiltered].keywords.fr+"</i>";
                       }*/
                      textDiv +=  type_event[cptEventsNotFiltered].description.fr+"</br/><div class='timeDate'>";
                       var nbEvent = 0;
                       for(var cptDateOfTheEvent = 0; cptDateOfTheEvent < type_event[cptEventsNotFiltered].timings.length; cptDateOfTheEvent++) {
                         var eventStartDate = new Date(type_event[cptEventsNotFiltered].timings[[cptDateOfTheEvent]].start);
                         var timeDiff = eventStartDate.getTime() - today.getTime();
                         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                         if (diffDays>=0 && diffDays<=120 && nbEvent<6) {
                           textDiv += "- " + weekday[eventStartDate.getDay()];
                           textDiv += " " + type_event[cptEventsNotFiltered].timings[[cptDateOfTheEvent]].start.substring(8,10) + " ";
                           var mois = type_event[cptEventsNotFiltered].timings[cptDateOfTheEvent].start.substring(5,7).replace("01", "janv.")
                            .replace("02", "fév.").replace("03", "mars").replace("04", "avril").replace("05", "mai").replace("06", "juin").replace("07", "juil.")
                            .replace("08", "aôut").replace("09", "sept.").replace("10", "oct.").replace("11", "nov.").replace("12", "déc.");
                           textDiv += mois + " ";
                           textDiv += type_event[cptEventsNotFiltered].timings[cptDateOfTheEvent].start.substring(0,4);
                           textDiv += ", "+type_event[cptEventsNotFiltered].timings[cptDateOfTheEvent].start.substring(11,16);
                           textDiv += " à " + type_event[cptEventsNotFiltered].timings[cptDateOfTheEvent].end.substring(11,16);
                           textDiv += "<br/>";
                           nbEvent++;
                         }
                         if (nbEvent==6) {
                           // textDiv += ". . .";
                         }

                       }
                       if (nbEvent==0) {
                          textDiv += "Consulter le site pour les horaires.";
                       }
                       textDiv += "</div><br/><div class='event_conditions'>";
                       textDiv += "<address>";
                       textDiv += type_event[cptEventsNotFiltered].locationName;
                       textDiv += " : ";
                       textDiv += type_event[cptEventsNotFiltered].address;
                       textDiv += "</address></div>";
                       if (type_event[cptEventsNotFiltered].conditions != null) {
                         textDiv += "<div class='event_conditions'>Conditions : " + type_event[cptEventsNotFiltered].conditions.fr+"</div>";
                       }
                       textDiv += "<br/><a href='" + type_event[cptEventsNotFiltered].canonicalUrl + "' target=_new><b><i>Plus d'infos</i></b></a>";
                       textDiv += "</div></div>";
                       textDiv += "</div>";

                       if(cptEventsFiltered%2 == 0){
                         textDiv += "<div class='clear'></div>";
                       }
                     }
      }
    }
      document.getElementById("textDiv").innerHTML = textDiv;
    }

$.getJSON("events.json", function (data) {
    $.each(data, function (index, value) {
              load_json(value);
    });
});

/*if (window.location.href.indexOf("coreparation.fr") > -1) {
  // OK !!!!!!!
    // Url is coreparation : je montre
    document.getElementById("filterCalendar44").style.display = 'inline-block';
} else {
      document.getElementById("filterCalendar44").style.display = 'none';
}*/

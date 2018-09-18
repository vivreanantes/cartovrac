
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
                 for (var i = 0; i < type_event.length; i++) {
                     var show = true;

                     if (typeof getQueryParam("department") == "undefined") {
                       if (type_event[i].department!="Loire-Atlantique") {
                         show = false;
                       }
                     }
                     if (show==true) {
                       textDiv += "<div class='wrap'><div class='truc'>";

                        textDiv += "<a id='calendar_" + type_event[i].slug + "'>";
                       if (type_event[i].thumbnail == false) {
                         textDiv += "&nbsp;";
                       }
                       else {
                         textDiv += "<img src='"+type_event[i].thumbnail+"' width='100px' style='max-width:100px;height:auto' />";
                       }
                       textDiv += "</a>";
                       textDiv += "</div><div class='truc'>";
                       textDiv += "<b>"+type_event[i].title.fr+"</b>";
                       textDiv += "<br/>"+type_event[i].description.fr;
                       /*if (typeof type_event[i].keywords !== "undefined") {
                         textDiv += "<br/><br/><i>"+type_event[i].keywords.fr+"</i>";
                       }*/
                       textDiv += "</div><div class='truc'>";
                       var nbEvent = 0;
                       for(var j = 0; j < type_event[i].timings.length; j++) {
                         var eventStartDate = new Date(type_event[i].timings[j].start);
                         var timeDiff = eventStartDate.getTime() - today.getTime();
                         var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                         if (diffDays>=0 && diffDays<=60 && nbEvent<3) {
                           textDiv += "- " + weekday[eventStartDate.getDay()];
                           textDiv += " " + type_event[i].timings[j].start.substring(8,10) + " ";
                           var mois = type_event[i].timings[j].start.substring(5,7).replace("01", "janv.")
                            .replace("02", "fév.").replace("03", "mars").replace("04", "avril").replace("05", "mai").replace("06", "juin").replace("07", "juil.")
                            .replace("08", "aôut").replace("09", "sept.").replace("10", "oct.").replace("11", "nov.").replace("12", "déc.");
                           textDiv += mois + " ";
                           textDiv += type_event[i].timings[j].start.substring(0,4);
                           textDiv += ", "+type_event[i].timings[j].start.substring(11,16);
                           textDiv += " à " + type_event[i].timings[j].end.substring(11,16);
                           textDiv += "<br/>";
                         }
                         if (nbEvent==3) {
                           textDiv += "...";
                         }
                         nbEvent++;
                       }
                       textDiv += "&nbsp;</div><div class='truc'>";
                       textDiv += "<address>";
                       textDiv += type_event[i].locationName;
                       textDiv += " : ";
                       textDiv += type_event[i].address;
                       textDiv += "</address><br/>";
                       if (type_event[i].conditions != null) {
                         textDiv += "<b>Conditions</b> : " + type_event[i].conditions.fr;
                       }
                       textDiv += "<br/><br/><a href='" + type_event[i].canonicalUrl + "' target=_new><i>Plus d'infos</i></a>";
                       textDiv += "</div></div>";
                       textDiv += "<div class='clear'></div>";
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

if (typeof getQueryParam("department") == "undefined") {
    document.getElementById("filterCalendar44").style.display = 'inline-block';
}

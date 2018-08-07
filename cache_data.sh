#!/bin/bash
wget -o output.json 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];((node["collaborative_repair_shop"="yes"]))'

# var ignoredShops, jtbPartners;
# 		$.when(
# 		    $.getJSON('ignored_shops.json', function(response) {
# 		        ignoredShops = response.elements
# 		    }),
# 		    $.getJSON('jtb_partners.json', function(response) {
# 		        jtbPartners = response.elements
# 		    })
# 			).then(function() {
# 			    var url = generateUrl();
# 			    window.location = url;
# 		});

		# function generateUrl() {
# coords='(40,-8,53,8)'
# url="https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];(area[\"ISO3166-1\"=\"FR\"]; )->.fr;(node[\"collaborative_repair_shop\"][\"collaborative_repair_shop\"!=\"no\"](area.fr);way[\"collaborative_repair_shop\"][\"collaborative_repair_shop\"!=\"no\"](area.fr););out center;"
# wget -O cache_data.json "$url"
# echo "$url"

partners=`jq '.elements' jtb_partners.json`

declare -A values=( ) 

while IFS= read -r description &&
      IFS= read -r key &&
      IFS= read -r value; do
  values[$key]=$value
  echo "Read key $key, with value $value" >&2
done < <(jq -r '.elements.[] | (.type, .ids)' <jtb_partners.json)

	  #       // Add partners
	  #       for (var partnerIndex in jtbPartners) {
			# 	var partner = jtbPartners[partnerIndex];
			# 	url += partner.type + '(id:';

			# 	$.each(partner.ids, function(key, value){
   #     				 url += value + ', ';
   #  			});
			# 	url = url.substring(0, url.length - 2);
			# 	url += ');';
			# }

			# url += '); - (';
echo $partners

			# // Add ignores
	  #       for (var ignoredIndex in ignoredShops) {
			# 	var ignored = ignoredShops[ignoredIndex];
			# 	url += '' + ignored.type + '(id:';

			# 	$.each(ignored.ids, function(key, value){
   #     				 url += value + ', ';
   #  			});
			# 	url = url.substring(0, url.length - 2);
			# 	url += ');';
			# }

			# url += '););out center;';

		# 	return url;
		# }
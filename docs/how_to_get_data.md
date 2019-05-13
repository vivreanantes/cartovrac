---
title: Documentation - How to get bulk data from OpenStreetMap
---

## How to download the list of bulk purchase shops from OpenStreetMap

In order to download the list of bulk purchase shops from OpenStreetMap, we use the [Overpass API](https://www.overpass-api.de/){:target="_blank"}. Overpass API allows to extract data from OSM using custom filters.

Here is a complete documentation about Overpass API: [https://wiki.openstreetmap.org/wiki/Overpass_API](https://wiki.openstreetmap.org/wiki/Overpass_API){:target="_blank"}

### Filter on bulk purchase

For CartoVrac we applied a filter on the [`bulk_purchase`tag](https://wiki.openstreetmap.org/wiki/Key:bulk_purchase){:target="_blank"} to collect all shops that have either `only` or `yes` for this tag. 

Shops that have `only` as `bulk_purchase` value are shops that sell all their products without packaging. It's a shop dedicated to bulk purchase such as the well known [day by day shops](http://daybyday-shop.com){:target="_blank"}.

Shops that have `yes`as `bulk_purchase` value are shops that sell part of their products without packaging. It could be a small convenience or an organic supermarket that offer an area of products available without packaging. 

For more information about the `bulk_purchase` tag, check the OSM wiki: [https://wiki.openstreetmap.org/wiki/Key:bulk_purchase](https://wiki.openstreetmap.org/wiki/Key:bulk_purchase){:target="_blank"}

### Filter by area

For CartoVrac, we also applied an area filter to limit results to France. We use the France country ISO3166, such as `(area["ISO3166-1"="FR"];)->.fr`. You can replace `FR` with your own country code to get results in your area.

For more information about how to apply an area to your requests, see: [https://wiki.openstreetmap.org/wiki/Overpass_API/Language_Guide#Area_clauses_.28.22area_filters.22.29]{:target="_blank"}

### Examples

Here are two examples of requests that allow you to get bulk purchase shops from OpenStreetMap:

- getting bulk purchase only shops: [https://www.overpass-api.de/api/interpreter?data=\[out:json\];\(area\[\"ISO3166-1\"=\"FR\"\];\)->.fr;\(node\[\"bulk_purchase\"=\"only\"\]\(area.fr\);way\[\"bulk_purchase\"=\"only\"\]\(area.fr\);\);out center;](https://www.overpass-api.de/api/interpreter?data=[out:json];(area[%22ISO3166-1%22=%22FR%22];)-%3E.fr;(node[%22bulk_purchase%22=%22only%22](area.fr);way[%22bulk_purchase%22=%22only%22](area.fr););out%20center;){:target="_blank"}

- getting all bulk purchase shops: [https://www.overpass-api.de/api/interpreter?data=\[out:json\];\(area\[\"ISO3166-1\"=\"FR\"\];\)->.fr;\(node\[\"bulk_purchase\"\~\"only|yes\"\]\(area.fr\);way\[\"bulk_purchase\"\~\"only|yes\"\]\(area.fr\);\);out center;](https://www.overpass-api.de/api/interpreter?data=[out:json];(area[%22ISO3166-1%22=%22FR%22];)-%3E.fr;(node[%22bulk_purchase%22~%22only|yes%22](area.fr);way[%22bulk_purchase%22~%22only|yes%22](area.fr););out%20center;){:target="_blank"}

## Automate content refresh

To get the list of shops from OpenStreetMap you can perform the Overpass API request as described in 
[How to download the list of bulk purchase shops from OpenStreetMap](#How-to-download-the-list-of-bulk-purchase-shops-from-OpenStreetMap){:target="_blank"}.

You can perform this request every time the user will try to access to your map. This will work but it will make a lot of requests to the Overpass API. As your data won't change every minute, refreshing the map from Overpass API at every use is not really useful. Therefore, you can cache it into a JSON file on your server. This will limit the number of useless requests. As requests have an energy cost, it's always good to limit them when not needed. :)

For CartoVrac, we cache all the data in a JSON file. This file is updated only a few times a day using our continuous integration that executes a script.

Here is an example of script that can download all the shops that are dedicated to bulk purchase in France. The JSON output returned by Overpass API is stored into a `cache_data.json` file:

```bash
#!/bin/bash
wget -o logGetContent.txt -O cache_data.json 'https://www.overpass-api.de/api/interpreter?data=[out:json];(area["ISO3166-1"="FR"];)->.fr;((node["bulk_purchase"="only"](area.fr);way["bulk_purchase"="only"](area.fr);););out center;'

```

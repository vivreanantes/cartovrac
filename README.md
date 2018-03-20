# vracanantes
Sources of the http://vracanantes.fr plateform that allows to display bulk purchase shops in the Loire-Atlantique french department map. This project can easily be re-used for other cities, regions or countries.

Performs the following request to get data from OpenStreetMap: 

https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25][maxsize:10737418];node["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);out;node["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);out;way["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);out center;way["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);out center;

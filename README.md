# vracanantes
Sources of the http://vracanantes.fr plateform that allows to display bulk purchase shops in the Loire-Atlantique french department map. This project can easily be re-used for other cities, regions or countries.

Performs the following request to get data from OpenStreetMap of the bulk purchase shops: 

https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25][maxsize:10737418];(node["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);node["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4));out center;

In order to add some particular shops that accept customer container, we added a list of nodes manually. To generate the url, open the getContent.html files that will redirect you to the overpass-api response.



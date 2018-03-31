# vracanantes
Sources of the http://vracanantes.fr plateform that allows to display bulk purchase shops in the Loire-Atlantique french department map. This project can easily be re-used for other cities, regions or countries.

Performs the following request to get data from OpenStreetMap of the bulk purchase shops: 

https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25][maxsize:10737418];(node["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);node["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4));out center;

In order to add some particular shops that accept customer container, we added a list of nodes manually:

https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:25][maxsize:10737418];(node["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);node["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="yes"](46.9,-2.7,47.9,-0.4);way["bulk_purchase"="only"](46.9,-2.7,47.9,-0.4);node(5456625523);node(1619954291);node(3474743920);node(3474835770);node(3474835769);node(1619954323);node(5456638652);node(1619954233);node(3470086335);node(5459152854);node(1727920548);node(3094180230);node(2255955928);node(5460145598);node(4394780789);node(476294585);node(2258874087);node(5460210375);node(2607658264);node(2289128176);node(2258874081);node(2485095784);node(3125795830);node(5460269733);node(5277827989);node(5460303725);node(2607658274);node(2255955928);node(5460375747);node(5460383333);node(5066198364);node(5460390736);node(1034073369);node(4201236610);node(2320443633);node(5460433357);way(224599086);node(5460439635);node(2583958955);node(5053854903);node(3683626198);node(364694509);node(1688797566);node(5460448714);node(2759353718);node(5460452139);node(5418567639);node(5460462886);node(5460468439);node(5518872681));out center;


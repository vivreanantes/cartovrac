#!/bin/bash
wget -o ./dist/logGetJtbContent.txt -O ./dist/cache_jtb_data.json 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];(node(id:5456625523,1619954291,3474743920,3474835770,3474835769,1619954323,5456638652,1619954233,3470086335,5459152854,1727920548,3094180230,2255955928,5460145598,4394780789,476294585,2258874087,5460210375,2607658264,2289128176,2258874081,2485095784,3125795830,5460269733,5277827989,5460303725,2607658274,2255955928,5460375747,5460383333,5066198364,5460390736,1034073369,4201236610,2320443633,5460433357,5460439635,2583958955,5053854903,3683626198,364694509,1688797566,2759353718,5460452139,5418567639,5460462886,5460468439,5518872681,5460362739,2672093889,5333494928,4267907899,2416353080,4201236594,4199637816,475385271,4917847921,2393205127,5528055528,5536163901,2258874082,4829754273,5659509071,669180003,5659525443,364694509,2258874078,5764223180,2403889708,1574437644,4416898146,4416911931,4750862440,5226961589,5851060201,6005834446,5165100105,3571306993,6026797392,5586113008,6094770462,3097043664,3611085431,6237965656,6133353987,4199637822,5959789630);way(id:224599086,73488024););out%20center;'


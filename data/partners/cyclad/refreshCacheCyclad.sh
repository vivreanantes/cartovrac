#!/bin/bash
wget -o logGetCycladContent.txt -O cache_cyclad_data.json 'https://www.overpass-api.de/api/interpreter?data=[out:json][timeout:500][maxsize:20737418];(node(id:5594452333,6391113867,4959779531,5735767337,4282340895,6396154439,6396162738,6397804285,6397851432,6397851431,6398093703);way(id:72801802););out%20center;'


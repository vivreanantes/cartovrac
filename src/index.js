import './map.js';
import './menu.js';

var Embedded = require('./embedded.js');

import 'typeface-roboto';

import style from "../assets/stylesheets/styles.css";


if (Embedded.getQueryParam("mode")=="embedded") {
  document.getElementById('map').style.top = "0";
  document.getElementById('cartovrac_link').style.display = "block";
  document.getElementById('menuToggle').style.display = 'none';
  document.getElementById('content').style.display = 'none';
}

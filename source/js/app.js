import * as _ from '../../node_modules/lodash/lodash.js';
import $ from '../../node_modules/jquery/dist/jquery.min.js';
window.jQuery = window.$ = $;
//import bootstrapjs from '../../node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js';
//Require is used here because import will not work with bootstrap's JS files due to the global jQuery requirement.
require('../../node_modules/bootstrap-sass/assets/javascripts/bootstrap');
jQuery.noConflict(true);

//import { whatsMyName } from './extra';

//console.log("Checking if imported file is working...");
//console.log(whatsMyName());

//jQuery test
/*
let bodyText = '<h2>Goodbye Moon!</h2>';
$('.container h1:first').append(bodyText);
*/

//const bootstrap3_enabled = (typeof $().emulateTransitionEnd == 'function');
//console.log("Bootstrap enabled? " + bootstrap3_enabled);
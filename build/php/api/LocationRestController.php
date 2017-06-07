<?php
require_once("LocationRestHandler.php");
//This file handles the main routing in conjunction with the .htaccess file.

$view = "";
if(isset($_GET["view"]))
	$view = $_GET["view"];

switch($view){

	case "find":
		// to handle REST Url /
		$locationRestHandler = new LocationRestHandler();
		$locationRestHandler->getLocation();
		break;
	default:
		break;
}
?>


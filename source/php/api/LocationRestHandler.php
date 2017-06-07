<?php
require_once("SimpleEncoder.php");
require_once('SimpleRest.php');
require_once("../../../vendor/autoload.php");
use GeoIp2\Database\Reader;


class LocationRestHandler extends SimpleRest {
   use SimpleEncoder;

	public function getLocation(){

		$reader = new Reader('../GeoLite2-City.mmdb');
		//If running from local host your client IP will be considered localhost (IPv6 = ::1, IPv4 = 127.0.0.1)
		if($this->getRealIpAddr() == "::1"){
			$record = $reader->city("66.150.214.52");
		}else{
			$record = $reader->city($this->getRealIpAddr());
		}
		/*
		print($record->country->isoCode . "\n"); // 'US'
		print($record->country->name . "\n"); // 'United States'
		print($record->country->names['zh-CN'] . "\n"); // '美国'

		print($record->mostSpecificSubdivision->name . "\n"); // 'Minnesota'
		print($record->mostSpecificSubdivision->isoCode . "\n"); // 'MN'

		print($record->city->name . "\n"); // 'Minneapolis'

		print($record->postal->code . "\n"); // '55455'

		print($record->location->latitude . "\n"); // 44.9733
		print($record->location->longitude . "\n"); // -93.2323
		*/

		if(isset($record->location->latitude) && isset($record->location->longitude)){
			$rawData = new stdClass;
			$rawData->lat = $record->location->latitude ;
			$rawData->long = $record->location->longitude;
		}

		if(!isset($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts found!');		
		} else {
			$statusCode = 200;
		}

		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);
				
		$response = $this->encodeJson($rawData);
		echo $response;
	}

	public function getRealIpAddr()
	{
	    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
	    {
	      $ip=$_SERVER['HTTP_CLIENT_IP'];
	    }
	    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
	    {
	      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
	    }
	    else
	    {
	      $ip=$_SERVER['REMOTE_ADDR'];
	    }
	    return $ip;
	}

}

?>
<?php
require_once("SimpleEncoder.php");
require_once("SimpleRest.php");
require_once("Posts.php");
//This file just implements the REST methods.
		
class PostsRestHandler extends SimpleRest {
	use SimpleEncoder;

	function getAllPosts() {	
		$posts = new Posts();
		$rawData = $posts->getAllPosts();

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts found!');		
		} else {
			$statusCode = 200;
		}

		//$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);

		if(strpos($requestContentType,'application/json') !== false){
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
	}
	
	
	public function getPost($id) {

		$posts = new Posts();
		$rawData = $posts->getPost($id);

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts found with that ID!');		
		} else {
			$statusCode = 200;
		}

		//$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);
				
		if(strpos($requestContentType,'application/json') !== false){
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
	}

	public function editPost($id,$author,$content,$dateposted,$title) {

		$posts = new Posts();
		$rawData = $posts->getPost($id);

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts found with that ID!');		
		} else {
			$statusCode = 200;
			$rawData = $posts->editPost($id,$author,$content,$dateposted,$title);
		}

		//$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);
				
		if(strpos($requestContentType,'application/json') !== false){
			$rawData = true;
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
	}

	public function deletePost($id) {

		$posts = new Posts();
		$rawData = $posts->getPost($id);

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts found with that ID!');		
		} else {
			$statusCode = 200;
			$rawData = $posts->deletePost($id);
		}

		//$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);
				
		if(strpos($requestContentType,'application/json') !== false){
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
	}

	public function addPost($author,$content,$dateposted,$title) {

		$posts = new Posts();
		$rawData = $posts->addPost($author,$content,$dateposted,$title);

		if(empty($rawData)) {
			$statusCode = 404;
			$rawData = array('error' => 'No posts data given!');		
		} else {
			$statusCode = 200;
		}

		//$requestContentType = $_SERVER['HTTP_ACCEPT'];
		$requestContentType = "application/json";
		$this ->setHttpHeaders($requestContentType, $statusCode);
				
		if(strpos($requestContentType,'application/json') !== false){
			$rawData = true;
			$response = $this->encodeJson($rawData);
			echo $response;
		} else if(strpos($requestContentType,'text/html') !== false){
			$response = $this->encodeHtml($rawData);
			echo $response;
		} else if(strpos($requestContentType,'application/xml') !== false){
			$response = $this->encodeXml($rawData);
			echo $response;
		}
	}


}
?>
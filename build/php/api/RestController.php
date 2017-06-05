<?php
require_once("PostsRestHandler.php");
//This file handles the main routing in conjunction with the .htaccess file.

$view = "";
if(isset($_GET["view"]))
	$view = $_GET["view"];

switch($view){

	case "all":
		// to handle REST Url /posts/list/
		$postsRestHandler = new PostsRestHandler();
		$postsRestHandler->getAllPosts();
		break;
		
	case "single":
		// to handle REST Url /posts/list/<id>/
		$postsRestHandler = new PostsRestHandler();
		$postsRestHandler->getPost($_GET["id"]);
		break;

	case "add":
		// to handle REST Url /posts/add/
		$postsRestHandler = new PostsRestHandler();
		$postsRestHandler->addPost($_POST["author"],$_POST["content"],$_POST["dateposted"],$_POST["title"]);
		break;

	case "delete":
		// to handle REST Url /posts/delete/
		$postsRestHandler = new PostsRestHandler();
		$postsRestHandler->deletePost($_POST["id"]);
		break;

	case "edit":
		// to handle REST Url /posts/edit/
		$postsRestHandler = new PostsRestHandler();
		$postsRestHandler->editPost($_POST["id"],$_POST["author"],$_POST["content"],$_POST["dateposted"],$_POST["title"]);
		break;

	case "" :
		//404 - not found;
		break;
}
?>


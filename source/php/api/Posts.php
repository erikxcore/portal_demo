<?php
//Base Posts class to handle CRUD on filesystem file.

Class Posts {

	private $json;

    public function __construct() {
    	$json_file = file_get_contents('../../posts.json');
    	$this->json = json_decode($json_file, true);
    }

	public function getAllPosts(){		
		return $this->json;
	}

	public function getPost($id){
		$requestedPost = null;

		foreach($this->json["Posts"] as $post) {
			if($post['ID'] == $id){
				$requestedPost = $post;
				break;
			}
		}

		return $requestedPost;
	}

	public function addPost($author,$content,$dateposted,$title){

		//BAD implementation - expects the latest post to be added last...which is technically correct.
		//Will also double escape /n
		foreach($this->json["Posts"] as $post) {
			$lastId = $post['ID'];
		}

		$new_id = $lastId + 1;

		$new_article = array(
		    "Author"    => $author,
		    "Title"  => $title,
		    "DatePosted"  => $dateposted,
		    "Content" => $content,
		   	"ID" => $new_id
		);

		array_push($this->json['Posts'],$new_article);

		//return($this->json);
		file_put_contents('../../posts.json', json_encode($this->json));

		//reset($this->json);
	}

	public function editPost($id,$author,$content,$dateposted,$title){

		foreach($this->json["Posts"] as &$post) {
			if($post['ID'] == $id){
				$post['Author'] = $author;
				$post['Title'] = $title;
				$post['DatePosted'] = $dateposted;
				//Will also double escape /n
				$post['Content'] = $content;
				break;
			}
		}

		file_put_contents('../../posts.json', json_encode($this->json));
	}

	public function deletePost($id){

		foreach($this->json["Posts"] as $key => $post) {
			if($post['ID'] == $id){
        		unset($this->json["Posts"][$key]);
				break;
			}
		}

		file_put_contents('../../posts.json', json_encode($this->json));

	}

}
?>
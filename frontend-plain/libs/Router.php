<?php
class Router {
	public $returned = false;
	public $url = null;
	public $id = null;

	function route($method, $url, $filename) {
		$this->url = $url;
		$methods = ['GET', 'POST'];
		if(in_array($method, $methods)) {
			if($_SERVER['REQUEST_METHOD'] == $method) {
				if(count(explode("{", $url)) > 1) {
					if(explode("}", explode("{", $url)[1])[0] == "id") {
						$tmp = explode("/", $_SERVER['REQUEST_URI'], 1);
						$cnt = count(explode("/", $_SERVER['REQUEST_URI'], 1));
						$this->id = $tmp[$cnt - 1];
					    require_once("./pages/$filename/$filename.php");
					    $this->returned = true;
					    return;
					}
				}
				if($_SERVER['REQUEST_URI'] == $url) {
					require_once("./pages/$filename/$filename.php");
					$this->returned = true;
					return;
				}
			}
		}
	}

	static function getUrl() {
		return $_SERVER['REQUEST_URI'];
	}

	static function getID() {
		$tmp = explode("/", $_SERVER['REQUEST_URI']);
		$cnt = count($tmp);
		$id = $tmp[$cnt -1];
		if(is_numeric($id)) {
			return $id;
		} else {
			return null;
		}
	}

	function __destruct() {
		if($_SERVER['REQUEST_METHOD'] == 'GET') {
			if(!$this->returned){
				$url = explode("/", $_SERVER['REQUEST_URI']);
				$url = $url[count($url)-1];

				if (file_exists("./pages/$url/$url.php")) {
					require_once("./pages/$url/$url.php");
				} else {
					require_once("./pages/errors/404.php");
				}
			}
		}
	}
}


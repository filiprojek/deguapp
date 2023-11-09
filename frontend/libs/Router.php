<?php
class Router {
	public $returned = false;
	public $url = null;

	function route($method, $url, $filename) {
		$this->url = $url;
		$methods = ['GET', 'POST'];
		if(in_array($method, $methods)) {
			if($_SERVER['REQUEST_METHOD'] == $method) {
				if ($_SERVER['REQUEST_URI'] == $url) {
					require_once("./pages/$filename/$filename.php");
					$this->returned = true;
					return;
				}
			}
		}
	}

	function getUrl() {
		return $_SERVER['REQUEST_URI'];
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


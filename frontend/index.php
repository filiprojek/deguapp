<?php
	require_once("./libs/Router.php");
	
	// Display Errors
	ini_set('display_startup_errors', 1);
	ini_set('display_errors', 1);
	error_reporting(-1);
	
	// Display var_dump
	#var_dump($_SESSION);
	
	// Date Time Zone
	date_default_timezone_set('Europe/Prague');
	$API_URL = "http://localhost:6060"
?>

<!DOCTYPE html>
<html lang="cs">
	<head>
		<title>DeguApp</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="home.css" rel="stylesheet">
	</head>
	<body>
		<header>
			<div class="flex-left">
				<a href="/">DeguApp</a>
			</div>
			<div class="flex-left">
				<a href="/login">Přihlásit se</a>
				<a href="/signup">Registrace</a>
				<a href="/add_beer">Přidat pivo</a>
				<a href="/add_review">Přidat recenzi</a>
			</div>
		</header>
		<section class="main-wrapper">
			<h1>DeguApp</h1>
			<?php
				$R = new Router();
				$R->route('GET', '/', 'home');
				$R->route('GET', '/add', 'add');
				$R->route('GET', '/login', 'login');
				$R->route('GET', '/signup', 'signup');


				$R->route('POST', '/contact/send', 'contact');

				$R = null;
			?>
		</section>
		<footer>
			<a href="https://git.filiprojek.cz/fr/deguapp">Source</a>
			<a href="http://filiprojek.cz/">(c) Filip Rojek, 2023</a>
		</footer>
	</body>
</html>


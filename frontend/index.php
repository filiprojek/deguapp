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
	$API_URL = "http://localhost:6060";

	$LOGGEDIN = !false;
?>

<!DOCTYPE html>
<html lang="cs">
	<head>
		<title>DeguApp</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="/css/_general.css" rel="stylesheet">
		<link href="/css/_variables.css" rel="stylesheet">
		<link href="/css/nav.css" rel="stylesheet">
		<link href="/css/home.css" rel="stylesheet">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">
	</head>
	<body>
		<header class="f-row nav-wrapper">
			<div class="">
				<a href="/">DeguApp</a>
			</div>
			<div class="">
			<?php
			if(!$LOGGEDIN) {
			?>
				<a href="/login">Přihlásit se</a>
				<a href="/signup">Registrace</a>
			<?php
			} else{
			?>
				<a href="/add_beer">Přidat pivo</a>
				<a href="/add_review">Přidat recenzi</a>
			<?php } ?>
			</div>
		</header>
		<section class="main-wrapper">
			<!-- routing shits -->
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


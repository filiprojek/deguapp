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
		<link rel="icon" href="/img/icons/beer.svg" type="image/svg+xml">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap">
		<link rel="stylesheet" href="/css/_general.css">
		<link rel="stylesheet" href="/css/_variables.css">
		<link rel="stylesheet" href="/css/nav.css">
		<link rel="stylesheet" href="/css/home.css">
		<link rel="stylesheet" href="/css/md-add.css">
		<link rel="stylesheet" href="/css/modal.css">
		<script defer src="/js/general.js"></script>
		<script defer src="/js/modal.js"></script>
		<script defer src="/js/nav.js"></script>
	</head>
	<body>
		<header class="f-row nav-wrapper">
			<div class="f-row f-center">
				<a href="/" class="f-row f-center">
					<img src="/img/icons/beer.svg" alt="degu app home">
					<span>Degu App</span>
				</a>
			</div>
			<div class="f-row nav-2">
			<?php
			if(!$LOGGEDIN) {
			?>
				<div id="nav-login" class="nav-item">
					<p>Přihlásit se</p>
				</div>
				<div id="nav-signup" class="nav-item">
					<p>Registrace</p>
				</div>
			<?php
			} else{
			?>
			 	<div class="nav-item">
					<img src="/img/icons/search.svg" alt="">
				</div>
			 	<div class="nav-item nav-add">
					<img src="/img/icons/plus.svg" alt="add beer or review">
				</div>
				<div class="nav-item nav-user">
					<img src="/img/icons/user.svg" alt="user icon">
					<a href="#">Test Testovic</a>
				</div>
			<?php } ?>
			</div>
		</header>
		<section class="main-wrapper">
			<!-- routing shits -->
			<?php
				$R = new Router();
				$R->route('GET', '/', 'home');
				$R->route('GET', '/beer/add', 'beer_add');
				$R->route('GET', '/review/add', 'review_add');
				$R->route('GET', '/login', 'login');
				$R->route('GET', '/signup', 'signup');

				$R->route('POST', '/contact/send', 'contact');

				if(!$LOGGEDIN && $R->getUrl() == '/') {
					// show login page
				}

				$R = null;
			?>

			<!-- modals -->
			<!-- add modal -->
			<section class="modal" id="md-add-tree">
				<div class="modal-content">
					<span class="md-close">&times;</span>
					<div class="f-row f-center">
						<a class="select-box" href="/beer/add">
							<b>Add Beer</b>
						</a>
						<a class="select-box" href="/review/add">
							<b>Add Review</b>
						</a>
					</div>
				</div>
			</section>

			<!-- user actions modal -->
			<section class="modal" id="md-user-tree">
				<div class="modal-content">
					<span class="md-close">&times;</span>
					<div class="f-col f-center">
						<h2>Hello User!<h2>
						<a href="/logout">Logout</a>
					</div>
				</div>
			</section>

			<!-- login modal -->
			<section class="modal" id="md-login">
				<div class="modal-content">
					<span class="md-close">&times;</span>
					<div class="f-col f-center">
						<p>Přihlaste se</p>
						<?php
							require_once("./pages/login/login.php");
						?>
					</div>
				</div>
			</section>

			<!-- login modal -->
			<section class="modal" id="md-signup">
				<div class="modal-content">
					<span class="md-close">&times;</span>
					<div class="f-col f-center">
						<p>Zaregistrujte se</p>
						<?php
							require_once("./pages/signup/signup.php");
						?>
					</div>
				</div>
			</section>

		</section>
		<footer>
			<a href="https://git.filiprojek.cz/fr/deguapp">Source</a>
			<a href="http://filiprojek.cz/">(c) Filip Rojek, 2023</a>
		</footer>
	</body>
</html>


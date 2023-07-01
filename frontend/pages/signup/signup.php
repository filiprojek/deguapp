<?php
	$API_URL = "http://localhost:6060"
?>

<link rel="stylesheet" href="/css/add.css">

<form class="form_add">
	<label for="username">Uživatelské jméno:</label>
	<input type="text" name="username" id="username">

	<label for="email">E-mail:</label>
	<input type="email" name="email" id="email">

	<label for="password">Heslo:</label>
	<input type="password" name="password" id="password">

	<button id="submit" class="btn-send">Registrovat se</button>
</form>

<script>
	const btn = document.querySelector('.btn-send')
	console.log(btn)
	btn.addEventListener('click', (e) => {
		e.preventDefault()
		send()
	})

	function send() {
		let form = new FormData(document.querySelector("form"));

		let body = JSON.stringify(Object.fromEntries(form))

		fetch('<?php echo $API_URL;?>/api/v1/user/add', {
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: body,
		})
			.then(res => {
				console.log(res)
				console.log(res.json())
				
			})
			.then(data => {
				console.log(data)
			})
			.catch(err => {
				console.log(err)
			})
	}
</script>


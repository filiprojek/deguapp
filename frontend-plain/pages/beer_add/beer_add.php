<?php
	$API_URL = "http://localhost:6060"
?>
<link href="/css/add.css" rel="stylesheet">
<h1>Přidání piva</h1>

<section class="flex f-center">
<form class="form_add card">
	<div class=form_group>
		<div class=form_group_label>
			<label for="name">Název, značka:</label>
			<input type="text" name="name" id="name" enable>
		</div>
		<div class=form_group_label>
			<label for="degree">Stupeň:</label>
			<input type="text" name="degree" id="degree" enable>
		</div>
		<div class=form_group_label>
			<label for="percentage">Procento:</label>
			<input type="text" name="percentage" id="percentage" enable>
		</div>
	</div>

	<div class=form_group>
		<div class=form_group_label>
			<label for="packaging">Obal:</label>
			<select id="packaging" name="packaging" enable>
				<option value="1">Plech</option>
				<option value="2">Sklo</option>
				<option value="3">Sud</option>
				<option value="4">Tank</option>
				<option value="5">Jiné</option>
			</select>
		</div>
	</div>
		<div class=form_group_label>
			<label for="note">Poznámka:</label>
			<input type="text" name="note" id="note" enable>
		</div>
	</div>
	<div class="form_group">
		<div class=form_group_label>
			<label for="photo">Foto:</label>
			<input type="file" name="photo" id="photo" enable>
			<label for="upload">Upload File</label>
n
		</div>
	</div>

	<div class="form_group">
		<button class="btn-send">Přidat záznam</button>
	</div>
</form>

<script>
	const btn = document.querySelector('.btn-send')
	btn.addEventListener('click', (e) => {
		e.preventDefault()
		console.log('click')
		send()
	})

	async function send() {
		console.log('click')
		let form = new FormData(document.querySelector("form"));

		let body = JSON.stringify(Object.fromEntries(form))
			fetch('<?php echo $API_URL;?>/api/v1/beer/add', {
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
</section>
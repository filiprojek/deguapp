<?php
	$API_URL = "http://localhost:6060"
?>
<link href="/css/add.css" rel="stylesheet">
<h1>Přidání záznamu</h1>

<form class="form_add">
	<div class=form_group>
		<div class=form_group_label>
			<label for="user">Uživatel:</label>
			<select id="user" name="user" enable>
				<option value="649f42f62b93542c8a465526">Dž</option>
				<option value="649f43182b93542c8a465528">Dý Ej En</option>
				<option value="649f42c32b93542c8a465524">frfr</option>
				<option value="649f43332b93542c8a46552a">Pch</option>
				<option value="649f46072b93542c8a46552f">Sš</option>
			</select>
		</div>
	</div>
	<div class=form_group>
		<div class=form_group_label>
			<label for="beer">Beer:</label>
			<select name="beer_id" id="beer_id">
			</select>
		</div>
	</div>

	<div class=form_group>
		<div class=form_group_label>
			<label for="logo">Logo:</label>
			<input type="number" name="logo" id="logo" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="aroma">Vůně:</label>
			<input type="number" name="aroma" id="aroma" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="foam">Pěna:</label>
			<input type="number" name="foam" id="foam" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="color">Barva:</label>
			<input type="number" name="color" id="color" min="1" max="10" step="1" enable>
		</div>
	</div>

	<div class=form_group>
		<div class=form_group_label>
			<label for="bitterness">Hořkost:</label>
			<input type="number" name="bitterness" id="bitterness" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="sweetness">Sladkost:</label>
			<input type="number" name="sweetness" id="sweetness" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="note">Poznámka:</label>
			<input type="text" name="note" id="note" enable>
		</div>
	</div>

	<div class=form_group>
		<div class=form_group_label>
			<label for="again">Dal bych si znovu?</label>
			<select name="again" enable>
				<option value="yes">Ano</option>
				<option value="no">Ne</option>
			</select>
		</div>

		<div class=form_group_label>
			<label for="overall_rating">Celkový dojem:</label>
			<input type="number" name="overall_rating" id="overall_rating" min="1" max="10" step="1" enable>
		</div>

		<div class=form_group_label>
			<label for="final_rating">Hodnocení:</label>
			<input type="number" name="final_rating" id="final_rating" min="1" max="10" step="0.5" enable>
		</div>
	</div>

	<div class=form_group>
		<div class=form_group_label>
			<label for="date">Datum:</label>
			<input type="date" name="date" id="date" enable>
		</div>

		<div class=form_group_label>
			<label for="attendedts">S kým:</label>
			<select id="attendedts" name="attendedts" multiple size="3" enable>
				<option value="649f42f62b93542c8a465526">Dž</option>
				<option value="649f43182b93542c8a465528">Dý Ej En</option>
				<option value="649f42c32b93542c8a465524">frfr</option>
				<option value="649f43332b93542c8a46552a">Pch</option>
				<option value="649f46072b93542c8a46552f">Sš</option>
			</select>
		</div>

		<div class=form_group_label>
			<label for="sign">Podpis:</label>
			<input type="text" name="sign" id="sign" enable>
		</div>
	</div>

	<div class="form_group">
		<div class=form_group_label>
			<label for="photo">Foto:</label>
			<input type="file" name="image" id="image" enable>
		</div>
		<div class=form_group_label>
			<label for="bebeer">BeBeer:</label>
			<input type="file" name="bebeer" id="bebeer" enable>
		</div>
	</div>


	<div class="form_group">
		<button class="btn-send">Přidat záznam</button>
	</div>
</form>

<script defer>
	async function getBeers() {
		try {
			const res = await fetch('<?php echo $API_URL;?>/api/v1/beer/get')
			const data = await res.json()
			console.log(data)
			return data
		} catch(err) {
			console.log(err, "penis")
		}
	}


	const btn = document.querySelector('.btn-send')
	btn.addEventListener('click', (e) => {
		e.preventDefault()
		send()
	})

	async function send() {
		let form = new FormData(document.querySelector("form"));

		let body = JSON.stringify(Object.fromEntries(form))
			fetch('<?php echo $API_URL;?>/api/v1/review/add', {
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

<script async defer>
	const packagingToLang = (id_pckg) => {
		const pckgs = {
			1: "Plech",
			2: "Sklo",
			3: "Plast"
		}
		return pckgs[id_pckg]
	}

	(async() => {
		// get beers and fill form data
		const beerData = await getBeers()
		const beer = document.querySelector('#beer_id')

		const beerOptions = beerData?.map((beer) => {
			return `
				<option value="${beer._id}">${beer.name} ${beer.degree} ${packagingToLang(beer.packaging)}</option>
			`
		})
		console.log(beerData)

		beer.innerHTML = beerOptions
	})()
</script>


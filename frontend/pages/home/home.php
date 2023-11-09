<section class="card-wrapper f-center" style="">
<?php
for ($i=0; $i < 8; $i++) { 
?>
	<div class="card card-beer f-col">
		<img width="200px" id="<?= $i ?>" src="https://live.staticflickr.com/65535/49818361653_351771faae_h.jpg" alt="beer image">
		<h2>Beer Name</h2>
		<p>12 Degree</p>
	</div>
<?php
} ?>

<script>
	qSA(".card-beer").forEach(el => {
		el.addEventListener("click", (e) => {
			window.location.href = "/beer/" + el.querySelector("img").id 
		})
	});
</script>
</section>

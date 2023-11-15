<section class="card-wrapper f-center" style="">
<?php
if(Router::getID() == null) {
for ($i=0; $i < 8; $i++) { 
?>
	<div class="card card-beer f-col">
		<img width="200px" id="<?= $i ?>" src="https://live.staticflickr.com/65535/49818361653_351771faae_h.jpg" alt="beer image">
		<h2>Beer Name</h2>
		<p>12 Degree</p>
	</div>
<?php
}} else { ?>
	<div class="card card-beer f-col">
		<img width="200px" id="<?= $i ?>" src="https://live.staticflickr.com/65535/49818361653_351771faae_h.jpg" alt="beer image">
		<h2>Beer Name</h2>
		<p>12 Degree</p>
	</div>
<?php
}?>
</section>

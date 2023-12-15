<template>
  <section class="card-wrapper f-center" style="">
  <!-- <?php
  if(Router::getID() == null) {
  for ($i=0; $i < 8; $i++) { 
  ?> -->
  	<div class="card card-beer f-col">
  		<img width="200px" id="<?= $i ?>" src="https://live.staticflickr.com/65535/49818361653_351771faae_h.jpg" alt="beer image">
  		<h2>Beer Name</h2>
  		<p>12 Degree</p>
  	</div>
  <!-- <?php
  }} else { ?> -->
  	<div class="card card-beer f-col">
  		<img width="200px" id="<?= $i ?>" src="https://live.staticflickr.com/65535/49818361653_351771faae_h.jpg" alt="beer image">
  		<h2>Beer Name</h2>
  		<p>12 Degree</p>
  	</div>
  <!-- <?php
  }?> -->
  </section>
</template>

<style>
.main-wrapper h1 {
	text-align: center;
}

.card-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
}
.card {
	width: 15rem;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	padding: .5rem;
	cursor: pointer;
}

</style>
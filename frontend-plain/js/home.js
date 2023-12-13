qSA(".card-beer").forEach(el => {
	el.addEventListener("click", (e) => {
		window.location.href = "/beer/" + el.querySelector("img").id 
	})
});

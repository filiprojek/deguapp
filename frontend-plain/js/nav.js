function show_modal(selector, modal_selector = null) {
	try {
		if(modal_selector === null) {
			modal_selector = selector
		}
		const btn = qS(selector)
		const md = qS(modal_selector)
		btn.addEventListener("click", (el) => {
		    md.classList.add("md-active")
		})
	} catch (error) {
	}
}

show_modal(".nav-add", "#md-add-tree")
show_modal("#nav-login", "#md-login")
show_modal("#nav-signup", "#md-signup")
show_modal(".nav-user", "#md-user-tree")

try {
	qS(".nav-user").addEventListener("click", () => {
		qS(".nav-user-dropdown").classList.toggle("visible")
	})
} catch (err) {
}
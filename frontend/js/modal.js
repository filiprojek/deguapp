// close on button
const close = qSA(".md-close")
close.forEach(one => {
    one.addEventListener("click", (el) => {
        const active = qS(".md-active")
        active.classList.remove("md-active")
    })
})

// close on backdrop
window.onclick = function(event) {
    const active = qS(".md-active")
    if (event.target == active) {
        active.classList.remove("md-active")
    }
} 
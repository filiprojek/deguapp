function qS(selector) {
    if(!selector) { 
        console.error("No selector is defined!")
        return
    }
    return document.querySelector(selector)
}

function qSA(selector) {
    if(!selector) { 
        console.error("No selector is defined!")
        return
    }
    return document.querySelectorAll(selector)
}
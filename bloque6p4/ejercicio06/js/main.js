function ocultarCapas() {
    document.querySelectorAll('section > div').forEach(capa => {
        capa.style.display = "none";
    });
}

document.querySelectorAll('h2').forEach(capa => {
    capa.addEventListener('click', e => {
        ocultarCapas();
        e.currentTarget.nextElementSibling.style.display = "block";
    });
});
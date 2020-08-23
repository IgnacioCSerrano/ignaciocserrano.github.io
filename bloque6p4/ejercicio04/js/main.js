let titulo = document.querySelector("h1");

function cambiarTitulo(t) {
    t.textContent = "Hello, world!";
}

function cambiarCSSTitulo(t) {
    t.style.border = "3px double grey";
}

document.querySelector("input").addEventListener("click", e => {
    cambiarTitulo(titulo);
    cambiarCSSTitulo(titulo);
});
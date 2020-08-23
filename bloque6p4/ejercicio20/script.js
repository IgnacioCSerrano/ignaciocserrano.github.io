let acerca = document.querySelector("#acerca");

acerca.addEventListener("click", (e) => {
    acerca.classList.add("abierto");
});

document.querySelector('#acerca i.fa-window-close').addEventListener('click', (e) => {
    e.stopPropagation(); // evita llamada a evento click asociado a acerca (si no se cancela la propagación, se vuelve a añadir clase abierto porque al hacer clic en el icono también se está haciendo clic en acerca)
    acerca.classList.remove("abierto");
});


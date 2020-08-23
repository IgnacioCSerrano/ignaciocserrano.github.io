let anadirLi = (elementoPadre, texto) => {
    let li = document.createElement("li");
    li.textContent = texto;
    elementoPadre.appendChild(li);
};

let eliminarElemento = elemento => {
    elemento.remove();
};
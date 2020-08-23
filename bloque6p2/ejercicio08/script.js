let lista = document.querySelector("#tareas ul");
let campoTexto = document.querySelector("#tareas input[type='text']");
let botonAnadir = document.querySelector("#tareas input[type='button']");

lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash-alt")) {
        eliminarElemento(e.target.parentNode);
    } else {
        e.target.classList.toggle("realizada");
    }
});

botonAnadir.addEventListener("click", () => {
    campoTexto.value = campoTexto.value.trim();
    if (campoTexto.value === "") {
        campoTexto.placeholder = "Tienes que escribir un texto ...";
        campoTexto.classList.add("error");
    } else {
        campoTexto.classList.remove("error");
        anadirLi(lista, campoTexto.value);
        lista.querySelector("li:last-child").innerHTML += `<i class="fas fa-trash-alt"></i>`;
    }
});
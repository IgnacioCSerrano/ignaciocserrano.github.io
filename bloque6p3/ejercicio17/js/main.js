/* global fetch */

let url = new URL("http://lmsgi.iesvjp.es/Ejercicios/horarios.json");

async function obtenerDatos(host) {
    let response = await fetch(host);
    let datos = await response.json();
    return datos;
}

function mostrarHorario(datos) {
    let caja = document.createElement("div");
    let preformatted = document.createElement("pre");
    preformatted.textContent = JSON.stringify(datos, null, 2);
    caja.appendChild(preformatted);
    document.getElementById("horario").appendChild(caja);
}

function mostrarPropiedades(datos) {
    let parrafo = document.createElement("p");
    parrafo.textContent = Object.keys(datos).join(", ");
    document.getElementById("keys").appendChild(parrafo);
}

function mostrarInfoGrupos(datos) {
    let lista = "<ul>";
    for (let g of datos.grupo) {
        lista += `<li>${g._nombre} - ${g.modulos.length} módulos</li>`;
    }
    lista += "</ul>";
    document.getElementById("grupos").innerHTML += lista;
}

obtenerDatos(url)   // NO funciona en local (usar variable definida en data.js)
    .then ( datos => {
        console.log(datos);
        mostrarHorario(datos);
        mostrarPropiedades(datos);
        mostrarInfoGrupos(datos);
    })
    .catch( error => console.log(error));

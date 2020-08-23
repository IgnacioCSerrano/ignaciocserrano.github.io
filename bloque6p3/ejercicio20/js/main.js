/* global LANGUAGES, fetch */

const LAN = "es";
//const LAN = "en";
//const LAN = "ar";
//const LAN = "zh";

let contenido = document.querySelector("main");

let getPobl = datos => datos.reduce( (ac, cv) => ac + cv.population, 0 ).toLocaleString("es");

function generarCabecera(datos) {
    let cabecera = document.createElement("h2");
    let idioma = LANGUAGES.find( idioma => idioma.code === LAN ).name;
    document.getElementById("idioma").textContent = idioma;
    cabecera.textContent = `Se habla ${idioma.toLowerCase()} en ${datos.length} países, con una población total de ${getPobl(datos)} personas.`;
    cabecera.classList.add("entrada");
    contenido.appendChild(cabecera);
};

let generarTarjeta = pais => {
    let tarjeta = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    img.src = pais.flag;
    img.alt = "bandera";
    p.innerHTML = `${pais.translations.es} - ${pais.capital} - <span>${pais.topLevelDomain[0]}</span> - ${pais.translations.ja}`;
    tarjeta.appendChild(img);
    tarjeta.appendChild(p);
    tarjeta.classList.add("tarjeta");
    return tarjeta;
};

function generarPaises(datos) {
    let rejilla = document.createElement("div");
    datos.forEach(pais => rejilla.appendChild( generarTarjeta(pais) ));
    rejilla.classList.add("rejilla");
    contenido.appendChild(rejilla);
};

function mensajeError(error) {
    let cabecera = document.createElement("h2");
    let p = document.createElement("p");
    cabecera.textContent = "Error en la conexión";
    p.textContent = `Datos del error: [ ${error} ]`;
    contenido.appendChild(cabecera);
    contenido.appendChild(p);
};

function obtenerDatos() {
    fetch(`https://restcountries.eu/rest/v2/lang/${LAN}`)
        .then ( response => response.json() )
        .then ( datos => {
            console.log(datos);
            generarCabecera(datos);
            generarPaises(datos);
        })
        .catch ( error => {
            console.log(error);
            mensajeError(error);
        })
        .finally ( () => document.querySelector(".spinner").style.display = "none" );
}       

obtenerDatos();

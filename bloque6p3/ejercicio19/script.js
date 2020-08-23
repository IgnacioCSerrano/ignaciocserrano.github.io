/* global fetch */

const RESULTS = 500;
//const RESULTS = 5000;
//const RESULTS = 5;
const NAT = "es";
//const NAT = "gb";
//const NAT = "fr";

let perfiles = document.getElementById("perfiles");

let url = `https://randomuser.me/api/?results=${RESULTS}&nat=${NAT}`;

let generarImagen = perfil => {
    let img = document.createElement("img");
    img.src = perfil.picture.large;
    img.alt = "foto perfil";
    return img;
};

let generarCuerpo = perfil => {
    let cuerpo = document.createElement("div");
    let h3 = document.createElement("h3");
    let h4 = document.createElement("h4");
    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    h3.textContent = `${perfil.name.first} ${perfil.name.last}`;
    h4.textContent = `${perfil.id.name} ${perfil.id.value}`;
    p2.innerHTML = `${perfil.dob.age} años<br>${perfil.email}`;
    p1.innerHTML = `${perfil.location.street.name}, ${perfil.location.street.number}<br>${perfil.location.city} - ${perfil.location.state}<br>`;
    cuerpo.appendChild(h3);
    cuerpo.appendChild(h4);
    cuerpo.appendChild(p1);
    cuerpo.appendChild(p2);
    return cuerpo;
};

let generarPie = perfil => {
    let pie = document.createElement("div");
    let p = document.createElement("p");
    let a = document.createElement("a");
    p.textContent = `${perfil.name.first} ${perfil.name.last}`;
    a.textContent = perfil.phone;
    a.href = `tel:${perfil.phone}`;
    pie.appendChild(p);
    pie.appendChild(a);
    return pie;
};

let generarTarjeta = perfil => {
    let tarjeta = document.createElement("div");
    let imagen = generarImagen(perfil);
    let cuerpo = generarCuerpo(perfil);
    let pie = generarPie(perfil);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(cuerpo);
    tarjeta.appendChild(pie);
    tarjeta.classList.add("perfil");
    return tarjeta;
};

function generarPerfilesV1(datos) {
    datos.results.forEach(perfil => perfiles.appendChild( generarTarjeta(perfil) ));
}

let generarPlantilla = p => {
    return `<div class="perfil">
                <img src=${p.picture.large} alt="foto perfil">
                <div>
                    <h3>${p.name.first} ${p.name.last}</h3>
                    <h4>${p.id.name} ${p.id.value}</h4>
                    <p>
                        ${p.location.street.name}, ${p.location.street.number}<br>
                        ${p.location.city} - ${p.location.state}<br>
                    </p>
                    <p>
                        ${p.dob.age} años<br>
                        ${p.email}
                    </p>
                </div>
                <div>
                    <p>${p.name.first} ${p.name.last}</p>
                    <a href="tel:${p.phone}">${p.phone}</a>
                </div>
            </div>`;
};

/*
    Es mucho más eficiente insertar en el DOM una sola cadena final con todos los perfiles
    que ir insertando cada perfil uno por uno según se va generando 
*/
function generarPerfilesV2(datos) {
    let cadena = "";
    datos.results.forEach(perfil => cadena += generarPlantilla(perfil) );
//    perfiles.innerHTML += cadena;
    perfiles.insertAdjacentHTML("beforeend", cadena);
}

function mensajeError(error) {
    let cabecera = document.createElement("h1");
    let parrafo = document.createElement("p");
    cabecera.textContent = "Error en la conexión";
    parrafo.textContent = `Datos del error: [ ${error} ]`;
    parrafo.style.paddingLeft = "10px";
    perfiles.appendChild(cabecera);
    perfiles.appendChild(parrafo);
}

function obtenerDatos() {
    fetch(url)
        .then ( response => response.json() )
        .then ( datos => {
            console.info("Técnica AJAX:");
            console.log(datos);
            if (datos.error) {
                throw datos.error;
            } else {
                let startTime = window.performance.now();
//                generarPerfilesV1(datos);
                generarPerfilesV2(datos);
                console.log ("TIEMPO EMPLEADO: " + ( window.performance.now() - startTime ) + " milisegundos");
            }
        })
        .catch ( error => {
            console.log(error);
            mensajeError(error);
        })
        .finally ( () => document.querySelector(".dl").style.display = "none" );
}

obtenerDatos();

/*
    JSONP (JSON with Padding) is a way to retrieve data by avoiding the cross-domain issue. The script tag is used to do so.

    Method to use JSONP:

    In HTML code, include the script tag. The source of this script tag will be the URL from where the data to be retrieve. 
    The web services allow to specify a callback function. In the URL include the callback parameter in the end.
    When the browser comes across the script element, it sends HTTP request to the source URL.
    The server sends back the response with JSON wrapped in a function call.
    The JSON response, which is in the form of a string, is parsed by the browser and converted to a JavaScript object. 
    The callback function is called and the generated object is passed to it.

        https://www.geeksforgeeks.org/javascript-jsonp/
*/

function processData(datos) {
    console.info("Técnica JSONP:");
    console.log(datos);
}

function obtenerDatosJSONP(url, cbValue, cbKey = "callback") { // cbKey es parámetro por defecto (adquiere valor predeterminado si no está especificado)
    let script = document.createElement("script");
    script.src = url + (url.includes("?") ? "&" : "?") + cbKey + "=" + cbValue;    
    script.defer = true;
    document.head.appendChild(script);
    script.onload = e => {
        e.target.remove(); // elimina script una vez se ha cargado y ha cumplido su cometido (obtener datos)
    }; 
    
//    script.onload = function() { 
//        this.remove();             // esta función no permitiría sintaxis arrow porque "this" no haría referencia a "script" sino a objeto "window"
//    };

}

/*
    In regular functions the this keyword represents the object that calls the function, which can be the window, the document, a button...
    An arrow function does not have its own this. The this value of the enclosing lexical scope (parent scope) is used. 
    Arrow functions follow the normal variable lookup rules, so while searching for this which is not present in the current scope, 
    an arrow function ends up finding the this from its enclosing scope.
    With arrow functions, the this keyword always represents the object that defined the arrow function.
*/

obtenerDatosJSONP(url, "processData"); // processData es función callback, pero en esta función se pasa como cadena porque forma parte de una query string

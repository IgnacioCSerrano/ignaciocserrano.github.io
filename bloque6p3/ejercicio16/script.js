/* global fetch */

async function obtenerDatos(host) {
    let response = await fetch(`http://ip-api.com/json/${host}`);
    let datos = await response.json();
    return datos;
}

function obtenerDatosV2(host, id) {
    fetch(`http://ip-api.com/json/${host}`)
        .then ( response => response.json() )
        .then ( datos => {
            console.log(datos);
            document.getElementById(id).innerHTML += `<div><pre>${JSON.stringify(datos, null, 2)}</pre></div>`;
        })
        .catch ( error => console.log(error) );
}

let consultaSparqlCajeros = {
    "default-graph-uri": "",
    "query": `select ?URI ?label ?entidadBancaria ?lat ?long  ?situadoEnVia ?tieneEnlaceSIG where { 
                ?URI a om:CajeroAutomatico.
                ?URI geo:lat ?lat.
                ?URI geo:long ?long.
                ?URI rdfs:label ?label.
                ?URI om:entidadBancaria ?entidadBancaria.
                ?URI om:situadoEnVia ?situadoEnVia.
                ?URI om:tieneEnlaceSIG ?tieneEnlaceSIG.
            }`,
    "format": "json"
};

let url = new URL("http://opendata.caceres.es/sparql");
url.search = new URLSearchParams(consultaSparqlCajeros).toString();

function obtenerCajeros(url) {
    fetch(url)
        .then ( response => response.json() )
        .then ( datos => {
            let caja = document.createElement("div");
            let preformatted = document.createElement("pre");
            preformatted.textContent = JSON.stringify(datos, null, 2);
            caja.appendChild(preformatted);
            document.getElementById("cajeros").appendChild(caja);
            console.log(datos);
        })
        .catch ( error => console.log(error) );
}

let colores = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff",
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a"
};


async function pruebaPOST() {
    let response = await fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colores)
    });
    let datos = await response.json();
    let caja = document.createElement("div");
    let preformatted = document.createElement("pre");
    preformatted.textContent = JSON.stringify(datos, null, 2);
    caja.appendChild(preformatted);
    document.getElementById("httpbinpost").appendChild(caja);
    console.log(datos);
}

obtenerDatos("iesvjp.es")
    .then ( datos => {
        console.log(datos);
        document.getElementById("ipapiiesvjpes").innerHTML += `<div><pre>${JSON.stringify(datos, null, 2)}</pre></div>`;
    })
    .catch ( error => console.log(error) );
    
obtenerDatos("iesvjp.eu")
    .then ( datos => {
        console.log(datos);
        document.getElementById("ipapiiesvjpeu").innerHTML += `<div><pre>${JSON.stringify(datos, null, 2)}</pre></div>`;
    })
    .catch ( error => console.log(error) );
    
obtenerDatosV2("8.8.8.8", "ipapi8888");

obtenerDatosV2("192.168.1.10", "ipapi1111");

obtenerCajeros(url);

pruebaPOST();
console.log("Mensaje posterior a llamada de método POST");
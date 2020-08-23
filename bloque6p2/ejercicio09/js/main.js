let lista = document.getElementById("lista");

let generarElemento = (titulo, valor) => {
    if (typeof valor === "boolean") {
        valor = true ? "Sí" : "No";
    }
    let definitionTerm = document.createElement("dt");
    let definitionData = document.createElement("dd");
    definitionTerm.textContent = titulo;
    definitionData.textContent = valor;
    lista.appendChild(definitionTerm);
    lista.appendChild(definitionData);
};

generarElemento("navigator.appName - nombre del navegador", navigator.appName);
generarElemento("navigator.appVersion - versión del navegador", navigator.appVersion);
generarElemento("navigator.language - idioma", navigator.language);
generarElemento("navigator.onLine - tiene conexión a internet", navigator.onLine);
generarElemento("navigator.platform - plataforma en la que ha sido compilado el navegador", navigator.platform);
generarElemento("navigator.product - motor del navegador", navigator.product);
generarElemento("navigator.userAgent - cabecera enviada al servidor con información del navegador", navigator.userAgent);
generarElemento("window.innerWidth - ancho de la ventana (px)", window.innerWidth);
generarElemento("window.innerHeight - alto de la ventana (px)", window.innerHeight);
generarElemento("screen.availWidth - ancho disponible de la pantalla (px)", screen.availWidth);
generarElemento("screen.availHeight - alto disponible de la pantalla (px)", screen.availHeight);
generarElemento("screen.width - ancho total de la pantalla (px)", screen.width);
generarElemento("screen.height - alto total de la pantalla (px)", screen.height);
generarElemento("screen.colorDepth - bits paleta de colores de la pantalla", screen.colorDepth);
generarElemento("screen.pixelDepth - bits por pixel de la pantalla", screen.pixelDepth);
generarElemento("screen.orientation.angle - ángulo de orientación de la pantalla", screen.orientation.angle);
generarElemento("screen.orientation.angle - tipo de orientación de la pantalla", screen.orientation.type);

const API_KEY = 'AIzaSyBgwA18ZeqJwXrepCmHVgpo3BAhqVnQFzQ';
const LANGUAGE = 'es';
const ZOOM = 18;
var latitud = '';
var longitud = '';
var id, options;

var botonOn = document.getElementById('on');
var botonOff = document.getElementById('off');
var sLatitud = document.querySelector('li:nth-of-type(1) > span');
var sLongitud = document.querySelector('li:nth-of-type(2) > span');
var iframe = document.getElementById('mapa');

window.addEventListener('load', function() {
    updateMap();
});

botonOn.addEventListener('click', function() {
    startGeolocation();
});

botonOff.addEventListener('click', function() {
    stopGeolocation();
});

function updateMap() {
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&language=${LANGUAGE}&zoom=${ZOOM}&q=${latitud},${longitud}`;
}

function cambiarBoton() {
    botonOn.classList.toggle('oculto');
    botonOff.classList.toggle('oculto');
}

function startGeolocation() {
    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(showPosition, errorHandler, options);
        navigator.geolocation.getCurrentPosition(success);
        id = navigator.geolocation.watchPosition(showPosition, errorHandler, options);
    } else {
        altert('Este navegador no soporta geolocalización');
    }
}

function success() {
    cambiarBoton();
}

function showPosition(position) {
    latitud = position.coords.latitude;
    longitud = position.coords.longitude;
    sLatitud.textContent = latitud.toFixed(4) + '°';
    sLongitud.textContent = longitud.toFixed(4) + '°';
    console.info(new Date() + ' Coordenadas: ' + latitud + ', ' + longitud);
    updateMap();
}

function errorHandler(err) {
    alert(err.message);
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

function stopGeolocation() {
    navigator.geolocation.clearWatch(id);
    latitud = '';
    longitud = '';
    sLatitud.textContent = '';
    sLongitud.textContent = '';
    cambiarBoton();
    updateMap();
}

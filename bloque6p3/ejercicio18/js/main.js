/* global options */

const API_KEY = "2b1f1a6c0aa54c7fb1f94bf39674060d"; // API asignada a la cuenta antoniobp@iesvjp.es
const MAX_CHAR = 1000;

let btnOn = document.querySelector("button:nth-of-type(1)");
let btnOff = document.querySelector("button:nth-of-type(2)");
let audio = document.querySelector("audio");
let idioma = document.getElementById("idioma");
let mensaje = document.getElementById("mensaje");
let wordCount = document.querySelector("p#wordCount > span");
let maxChar = document.querySelector("p:nth-of-type(2) > span");
let caracteres = [];

options.forEach(option => {
    let op = document.createElement("option");
    op.textContent = option.text;
    op.value = option.value;
    op.selected = option.selected;
    idioma.appendChild(op);
});

let actualizarConteo = () => {
    caracteres = mensaje.value.split("");   // construye array con todos los caracteres individuales del mensaje
    wordCount.textContent = caracteres.length;
    if (caracteres.length > MAX_CHAR) {
        wordCount.classList.add("rojo");
        btnOn.classList.add("not-allowed");
        btnOn.disabled = true;
    } else {
        wordCount.classList.remove("rojo");
        btnOn.classList.remove("not-allowed");
        btnOn.disabled = false;
    }
};

let swapButton = () => {
    btnOn.classList.toggle("oculto");
    btnOff.classList.toggle("oculto");
};

window.addEventListener("load", () => {
    actualizarConteo();
    maxChar.textContent = MAX_CHAR;
});

/*
    Evento 'keyup' en solitario es mejor que evento 'keydown' para contar número caracteres porque aquel se dispara no al presionar tecla 
    sino dejar de pulsarla y de esta manera el conteo no va desfasado una unidad por detrás.
 */
mensaje.addEventListener("keyup", actualizarConteo);

/*
    Evento 'keydown' acompañado de 'keyup' permite que la actualización de caracteres se produzca en tiempo real al presionar una tecla 
    durante un largo rato sin soltar.
 */
mensaje.addEventListener("keydown", actualizarConteo);

btnOn.addEventListener("click", () => {
    swapButton();
    audio.src = `http://api.voicerss.org/?key=${API_KEY}&hl=${idioma.value}&src=${mensaje.value}`;
    audio.play();
});

btnOff.addEventListener("click", () => {
    swapButton();
    audio.pause();
    audio.currentTime = 0;
});

audio.addEventListener("ended", swapButton);
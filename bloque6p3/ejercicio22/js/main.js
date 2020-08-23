/* global datosJSON */

console.log(datosJSON);

let pre = document.querySelector("pre");

pre.textContent = JSON.stringify(datosJSON, null, 2);
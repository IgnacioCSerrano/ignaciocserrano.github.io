let info = document.getElementById('coord');
let caja = document.getElementById('caja');
let spanX = document.querySelector('#caja > span:nth-child(1)');
let spanY = document.querySelector('#caja > span:nth-child(2)');
let isInside;

function updateGlobalCoord(e) {
    info.classList.remove('oculto'); // JavaScript won't complain if you try to remove a class that doesn't exist.
    /*
        Es importante que elemento info que contiene información de coordenadas globales del ratón NO esté exactamente unido al puntero del ratón
        por borde superior izquierdo (style.top = e.clientY | style.left = e.clientX) para evitar comportamiento anómalo en desplazamiento por caja: 
        coordenadas locales se atascan porque navegador detecta que ratón está entrando y saliendo de caja constantemente, es decir, 
        mouseenter y mouseleave no solo se disparan respectivamente al entrar y salir de caja sino al desplazarse por ella;
        esto sucede porque cursor descansa en todo momento sobre elemento info, que no es hijo de caja sino de document, 
        por lo que navegador interpreta que ratón ha salido de caja al detectar que está sobre info y que vuelve a entrar en caja 
        al detectar que efectivamente está dentro, disparando los eventos correspondientes, modificando valor de isInside 
        y afectando llamanda de callback updateLocalCoord.
        Este comportamiento también se aprecia aunque se sustituyan eventos mouseenter y mouseleave por listener mousemove 
        emparejado a caja que ejecute callback updateLocalCoord al dispararse: en este caso coordedanas locales siguen atascándose porque navegador 
        detecta que ratón se está desplazando dentro y fuera de la caja simultáneamente, es decir, ratón se desplaza dentro de la caja pero se desplaza también 
        sobre info, que no forma parte de la caja, al moverse solidariamente con él.
    */
    info.style.top = e.clientY + 10 + 'px'; // se suman 10px para evitar comportamiento anómalo
    info.style.left = e.clientX + 10 + 'px'; // se suman 10px para evitar comportamiento anómalo
    info.textContent = `X: ${e.clientX}, Y: ${e.clientY}`;
    if (isInside) {
        updateLocalCoord(e);
    }
}

function updateLocalCoord(e) {
    spanX.textContent = Math.round(e.clientX - caja.getBoundingClientRect().left - caja.clientLeft);
    spanY.textContent = Math.round(e.clientY - caja.getBoundingClientRect().top - caja.clientTop);
    /*
        getBoundingClientRect().left and getBoundingClientRect().top return respectively the left and top position of the element relative to the document viewport
        clientLeft clientTop return respectively the amount of left and top border (and scrollbar if exists) between the element boundary and the inner coordinates
    */
}

function deleteLocalCood() {
    spanX.textContent = '0';
    spanY.textContent = '0';
}

document.addEventListener('mousemove', updateGlobalCoord);

//caja.addEventListener('mousemove', updateLocalCoord);

caja.onmouseenter = e => {
    isInside = true;
//    console.log('enters caja');
};

caja.onmouseleave = e => {
    isInside = false;
    deleteLocalCood();
//    console.log('leaves caja');
};

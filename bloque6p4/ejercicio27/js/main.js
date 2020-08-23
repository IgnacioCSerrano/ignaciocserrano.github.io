let boton1 = document.querySelector('button:nth-of-type(1)'),
    boton2 = document.querySelector('button:nth-of-type(2)');

boton1.onclick = e => { 
    zoomImagen(prompt('Introduzca un selector (ejemplo ".galeria")')); 
};

boton2.onclick = e => { 
//    galeriaImagenes(prompt('Introduzca un selector (ejemplo ".galeria")'));
    galeriaImagenes('.galeria');
};
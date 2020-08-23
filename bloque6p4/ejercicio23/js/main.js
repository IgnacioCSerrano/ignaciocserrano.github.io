let contenido = document.getElementById('wrapper'),
    boton = document.getElementById('up');

function getPorcentaje() {
    let max = document.documentElement.scrollHeight - window.innerHeight; // window.innerHeight = document.documentElement.clientHeight
    let porcentaje = (window.pageYOffset / max) * 100;
    return porcentaje;
}

window.addEventListener('DOMContentLoaded', e => {
    boton.classList.add('oculto');
});

window.addEventListener('scroll', e => {
    document.getElementById('progress').style.width = getPorcentaje() + '%';
    // Si navegador sitúa scroll en documento raíz (html) en lugar de body hay que acceder a él mediante document.documentElement o document.querySelector(“html”) 
    if (document.documentElement.scrollTop === 0) {
        boton.classList.add('oculto');
    } else {
        boton.classList.remove('oculto');
    }
});

boton.addEventListener('click', e => {
    document.documentElement.scrollTop = 0;
});

/*
    // How to get the the highest value of all all height ones found on document:

    var height = Math.max( document.body.scrollHeight, 
                           document.body.offsetHeight, 
                           document.documentElement.clientHeight, 
                           document.documentElement.scrollHeight, 
                           document.documentElement.offsetHeight );
*/
let letras;
let wrapper;

document.addEventListener("DOMContentLoaded", (e) => {
    document.body.style.backgroundColor = generarRGB();
//    letras = document.querySelector("p");
//    wrapper = document.querySelector("#wrapper");
//    letras.addEventListener("mouseover", e => {
//        wrapper.style.fontSize = e.target.style.fontSize;
//    });
//    letras.addEventListener("mouseout", e => {
//        wrapper.style.fontSize = "initial";
//    });
});

//window.addEventListener("load", (e) => {
//    letras = document.querySelector("p");
//    wrapper = document.querySelector("#wrapper");
//    letras.addEventListener("mouseover", e => {
//        wrapper.style.fontSize = e.target.style.fontSize;
//    });
//    letras.addEventListener("mouseout", e => {
//        wrapper.style.fontSize = "initial";
//    });
//});

letras = document.querySelector("p");
wrapper = document.querySelector("#wrapper");

letras.addEventListener("mouseover", e => {
    wrapper.style.fontSize = e.target.style.fontSize;
});

letras.addEventListener("mouseout", e => {
    wrapper.style.fontSize = "initial";
});

/*
    Código no funciona si se sustituye mouseover/mouseout por mouseenter/mouseleave porque estos últimos no admiten propagación, 
    por lo que los eventos se disparan respectivamente al posar el ratón sobre cualquier punto del párrafo y sacarlo de él; 
    de esta manera, independientemente del elemento hijo span sobre el se pose el ratón, e.target va a ser siempre igual a e.currentTarget (elemento p),
    el cual no tiene especificado un estilo en línea de tamaño de fuente (style.fontSize) por lo que no hay variación en wrapper
*/

letras.addEventListener("mouseenter", e => {
    console.log(e.target);
    console.log(e.currentTarget);
});

letras.addEventListener("mouseleave", e => {
    console.log(e.target);
    console.log(e.currentTarget);
});

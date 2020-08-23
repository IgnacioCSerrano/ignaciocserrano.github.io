const INTERV = 10; // valor tiene que ser inferior a parámetro definido como time en función insertFadeIn

function insertFadeIn(parent, el, time) {
    el.style.opacity = 0;

    /*
        Node.insertBefore(): second parameter signals node before which new node is inserted 
        (if null, then new node is inserted at the end of parentNode's child nodes.
    */
    parent.insertBefore(el, null);

//    el.style.transition = `opacity ${ms / 1000}s ease-in`;
//    setTimeout ( () => {
//        el.style.opacity = 1;
//    }, 10);

    let t = setInterval( () => {
        el.style.opacity = Number(el.style.opacity) + (INTERV / time); // opacity es dato tipo string y la suma de números string no produce número, sino concatenación
    }, INTERV);
    
    setTimeout ( () => {
        clearInterval(t);
    }, time);
}

// All credits to: https://stackoverflow.com/a/33424474

function removeFadeOut(el, time) {
    el.style.transition = `opacity ${time / 1000}s ease-out`;
    el.style.opacity = 0;
    setTimeout( () => {
        el.remove();
    }, time);
}

document.addEventListener('mouseover', e => {
    if (e.target.classList.contains('tooltip-arrow')) {
        /*
            Es importante eliminar tooltip previo en caso de que exista (puede estar presente porque todavía no ha dado tiempo a ser eliminado
            desde función removeFadeOut al mover ratón entre elementos de clase tooltip-arrow en un intervalo de tiempo inferior a 200ms)
            para evitar que se apilen sucesivos tooltips uno encima de otro
        */
        if (e.target.querySelector('div.arrow_box')) {
            e.target.querySelector('div.arrow_box').remove();
        }
//        let tooltip = `<div class="arrow_box">${e.target.dataset.ejemplo}</div>`;
//        e.target.insertAdjacentHTML('afterend', tooltip);
        let tooltip = document.createElement('div');
        let dataset = e.target.dataset;
        tooltip.classList.add('arrow_box');
        tooltip.textContent = dataset[Object.keys(dataset)[0]];
//        insertFadeIn(e.target.parentNode, tooltip, 150);
        insertFadeIn(e.target, tooltip, 150);
    }
});

document.addEventListener('mouseout', e => {
    if (e.target.classList.contains('tooltip-arrow')) {
        removeFadeOut(e.target.querySelector('div.arrow_box'), 200);
    }
});
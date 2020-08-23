let userSelector, modal, modalGaleria,
    imgOriginal = null,
    arrayImgGal = [],
    i = 0;

//let fontAwesomeLink = {
//    href: 'https://use.fontawesome.com/releases/v5.13.0/css/all.css',
//    integrity: 'sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V',
//    crossorigin: 'anonymous'
//};
//
//function crearFontAwesomeLink() {
//    let link = document.createElement('link');
//    link.rel = 'stylesheet';
//    link.href = fontAwesomeLink.href;
//    link.integrity = fontAwesomeLink.integrity;
//    link.setAttribute('crossorigin', fontAwesomeLink.crossorigin);
//    document.head.appendChild(link);
//}

/*
 * NOTA: En caso de querer usar una librería externa como Font Awesome (que no es recomendable para usar solo tres iconos que se pueden generar de otra forma) 
 * es preferible indicar en la documentación del plugin que se hace uso de dicha librería y que es necesario importarla (como hace Bootstrap con jQuery) 
 * en lugar de añadirla con código JS por dos motivos: primero porque la importación programática podría causar problemas de compatibilidad con el cliente 
 * (por ejemplo si ya tenía importada otra versión de Font Awesome)y segundo porque es posible que ni siquiera esté permitido en los ToS de Font Awesome 
 * (requiere iniciar sesión para usar CDN)
 */

/*
 * Función que determina si elemento recibido por parámetro es una imagen y es apta para ser mostrada en modal.
 */
let imageApt = element => ( element.tagName.toLowerCase() === 'img' ) && ( !userSelector || element.matches(userSelector) );

/*
 * Función que determina si imagen recibida por parámetro está reducida respecto a su tamaño original.
 */
let imageRed = image => ( image.width < image.naturalWidth || image.height < image.naturalHeight );

function setEstilosModal(modal, closeIcon) {
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: rgba(64, 61, 40, 0.9);
    `;
    closeIcon.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: xxx-large;
        color: snow;
        cursor: pointer;
        user-select: none;
        transition: color 0.1s;
    `;
}

function addEventosModal(modal, closeIcon, img) {
    modal.addEventListener('click', e => {
        e.stopPropagation(); // evita llamada a función zoom al hacer clic sobre imagen de modal
    });
    closeIcon.addEventListener('click', e => {
        img.removeAttribute('src');
        img.removeAttribute('style');
        modal.style.display = 'none';
        imgOriginal = null;
    });
    closeIcon.onmouseenter = e => {
        e.target.style.color = 'rgb(120,0,0)';
    };
    closeIcon.onmouseleave = e => {
        e.target.style.color = 'snow';
    };
}

function cancelCursorZoom(img) {
    img.addEventListener('mouseover', e => {
        e.stopPropagation(); // evita llamada a función cursorZoom al posar ratón sobre imagen de modal
    });
}

function crearModal() {
    let closeIcon = document.createElement('span');
    let img = document.createElement('img');
    modal = document.createElement('div');
    closeIcon.innerHTML = '&otimes;';
    setEstilosModal(modal, closeIcon);
    addEventosModal(modal, closeIcon, img);
    cancelCursorZoom(img);
    modal.appendChild(closeIcon);
    modal.appendChild(img);
    document.body.appendChild(modal);
}

function mostrarModal() {
    if (modal) {
        modal.style.display = 'flex';
    } else {
        crearModal();
    }
}

//function resizeImagen(img) {
//    if (img.naturalWidth > (0.95 * window.innerWidth) || img.naturalHeight > (0.95 * window.innerHeight)) {
//        if ((img.naturalWidth / img.naturalHeight) > (window.innerWidth / window.innerHeight)) {
//            img.style.width = '95vw';
//            img.style.height = 'auto';
//        } else {
//            img.style.width = 'auto';
//            img.style.height = '95vh';
//        }
//    } else {
//        img.style.width = img.naturalWidth + 'px';
//        img.style.height = img.naturalHeight + 'px';
//    }
//}

/*
 * NOTA: debido a comportamiento extraño de navegador (detecta naturalWidth y naturalHeight nulos en imagen plantilla (o clonada) 
 * al tener Dev Tools -F12- activo, especialmente en device toolbar) es preferible determinar valores de anchura y altura de imagen original 
 * en función getOptSize (antes resizeImagen) y aplicar estilos devueltos en imagen plantilla en lugar de establecer estilos dentro de función 
 */

function getOptSize(img) { 
    let ancho = 'auto', 
        alto = 'auto';
    if ( img.naturalWidth > (0.95 * window.innerWidth) || img.naturalHeight > (0.95 * window.innerHeight) ) {
        if ( (img.naturalWidth / img.naturalHeight) > (window.innerWidth / window.innerHeight) ) {
            ancho = '95vw';
        } else {
            alto = '95vh';
        }
    } else {
        ancho = img.naturalWidth + 'px';
    }
    return [ancho, alto];
}

function setImgSize() {
    let imgModal = modal.querySelector('img');
    let size = getOptSize(imgOriginal);
//    resizeImagen(imgModal);
    imgModal.style.width = size[0];
    imgModal.style.height = size[1];
}

function zoom(e) {
    if ( imageApt(e.target) && imageRed(e.target) ) {
//      let imgClone = img.cloneNode(); // Node.cloneNode() method returns a duplicate of the node
        mostrarModal();
        imgOriginal = e.target;
        imgOriginal.style.removeProperty('cursor');
        modal.querySelector('img').src = imgOriginal.src;
        setImgSize();
    }
}

document.body.addEventListener('click', zoom);
document.body.addEventListener('contextmenu', zoom);

function cursorZoom(e) {
    if ( imageApt(e.target) && imageRed(e.target) ) {
        e.target.style.cursor = 'zoom-in';
    }
}

function cursorBack(e) {
    if ( imageApt(e.target) && imageRed(e.target) ) {
        e.target.style.removeProperty('cursor');
    }
}

document.body.addEventListener('mouseover', cursorZoom);
document.body.addEventListener('mouseout', cursorBack);

/*
 * Función que recibe un selector de forma que solo se puede realizar zoom 
 * con las imágenes que coincidan con el selector.
 */
function zoomImagen(selector) {
    userSelector = selector;
}

function setEstilosIconos(rArrIcon, lArrIcon) {
    rArrIcon.style.cssText = `
        position: absolute;
        right: 10px;
        padding: 0 10px;
        font-size: xxx-large;
        color: snow;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        transition: color 0.1s;
    `;
    lArrIcon.style.cssText = `
        position: absolute;
        left: 10px;
        padding: 0 10px;
        font-size: xxx-large;
        color: snow;
        border-radius: 10px;
        cursor: pointer;
        user-select: none;
        transition: color 0.1;
    `;
}

function addEventosIconos(rArrIcon, lArrIcon, closeIcon) {
    rArrIcon.onclick = e => {
        i++;
        mostrarImgGal();
    };
    lArrIcon.onclick = e => {
        i--;
        mostrarImgGal();
    };
    closeIcon.addEventListener('click', e => { // addEventListener en lugar de onclick para no sobreescribir funcionalidades de listener anterior (función addEventosModal)
        rArrIcon.style.display = 'none';
        lArrIcon.style.display = 'none';
        arrayImgGal = [];
        i = 0;
    });
    [rArrIcon, lArrIcon].forEach(icon => {
        icon.onmouseenter = e => {
            e.target.style.backgroundColor = 'rgb(120,120,120)';
        };
        icon.onmouseleave = e => {
            e.target.style.backgroundColor = '';
        };
    });
}

function crearFlechas() {
    let rArrIcon = document.createElement('span');
    let lArrIcon = document.createElement('span');
    let closeIcon = modalGaleria.querySelector('span:nth-of-type(1)');
    rArrIcon.innerHTML = '&Gt;';
    lArrIcon.innerHTML = '&Lt;';
    setEstilosIconos(rArrIcon, lArrIcon);
    addEventosIconos(rArrIcon, lArrIcon, closeIcon);
    modalGaleria.appendChild(rArrIcon);
    modalGaleria.appendChild(lArrIcon);
}

function mostrarModalGaleria() {
    if (modalGaleria) {
        modalGaleria.style.display = 'flex';
    } else {
        mostrarModal();
        modalGaleria = modal;
        crearFlechas();
    }
}

function mostrarImgGal() {
    modalGaleria.querySelector('span:nth-of-type(2)').style.display = (i === arrayImgGal.length - 1) ? 'none' : 'initial';
    modalGaleria.querySelector('span:nth-of-type(3)').style.display = (i === 0) ? 'none' : 'initial';
    modalGaleria.querySelector('img').src = arrayImgGal[i].src;
    imgOriginal = arrayImgGal[i];
    setImgSize();
}

/*
 * Función que crea una galería con las imágenes que cumplen 
 * con el selector pasado por parámetro.
 */
function galeriaImagenes(selector) {
    
    /*
        [...nodelist] will make an array of out of an object if the object is iterable.
        Array.from(nodelist) will make an array out of an object if the object is iterable or if the object is array-like (has .length and numeric props)
        (spread syntax allows an iterable object to be expanded with array properties whereas from() creates a new array)
    */
    
//    let nodelist = document.querySelectorAll(selector);
//    [...nodelist].filter(item => item.tagName.toLowerCase() === 'img');
    
    Array.from(document.querySelectorAll(selector)).filter(item => item.tagName.toLowerCase() === 'img' && item.src).forEach(img => {
        arrayImgGal.push(img);
    });
    if (arrayImgGal.length === 0) {
        alert('No hay ninguna imagen que cumpla con el selector introducido');
    } else {
        mostrarModalGaleria();
        mostrarImgGal();
    }
}

window.addEventListener('resize', e => {
    if (imgOriginal) {
        setImgSize(); // comprueba que el tamaño de la imagen del modal es adecuado cada vez que detecta cambio en el tamaño de la ventana
    }
});

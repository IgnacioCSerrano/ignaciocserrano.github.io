let status = document.getElementById('status');
let orient = document.querySelector('#orient > span');

function alternarFondo(e) {
    e.currentTarget.classList.toggle('fondo');
}

function setFondoRand(e) {
    /*
        KeyboardEvent.keyCode is deprecated; the alternative is KeyboardEvent.key, which displays whatever characters 
        we type on an input without caring about the type of keyboard layout that we are currently using
    */
    
//    if (e.keyCode === 32) { // keycode 32 corresponds to space char (' ')

    if (e.key === ' ') {
        let colorFondo = generarRGB();
        e.target.style.backgroundColor = colorFondo;
        console.log("Color de fondo: " + colorFondo);
    }
}

function updateStatus(e) {
    if (navigator.onLine) {
        status.textContent = 'Online';
        status.classList.replace('rojo', 'verde');
    } else {
        status.textContent = 'Offline';
        status.classList.replace('verde', 'rojo');
    }
}

function updateOrient(e) {
    orient.textContent = (screen.orientation.type === "portrait-primary" || screen.orientation.type === "portrait-secondary") ? "VERTICAL" : "HORIZONTAL";
    console.log("Orientacion: " + screen.orientation.type);
}

window.addEventListener('load', e => {
    updateStatus(e);
    updateOrient(e);
});

document.querySelector('#content > div:nth-child(1)').addEventListener('click', alternarFondo);
document.querySelector('#content > div:nth-child(2)').addEventListener('dblclick', alternarFondo);
/*
    ontextmenu event fires when the user attempts to open a context menu, 
    typically by clicking the right mouse button or pressing the context menu key. 
 */
document.querySelector('#content > div:nth-child(3)').addEventListener('contextmenu', alternarFondo);
document.querySelector('#content > div:nth-child(4)').addEventListener('mousedown', alternarFondo);
document.querySelector('#content > div:nth-child(5)').addEventListener('mouseup', alternarFondo);
/*
    mouseenter and mouseleave events are only triggered when the mouse pointer respectively enters or leaves 
    the element that either triggered the event (target) or is attached to the event listener (currentTarget).
 */
document.querySelector('#content > div:nth-child(6)').addEventListener('mouseenter', alternarFondo);
document.querySelector('#content > div:nth-child(7)').addEventListener('mouseleave', alternarFondo);
/*
    mouseover and mouseout events are triggered when the mouse pointer respectively enters or leaves
    not only the element but also its child elements (this can be tested by hovering over the div text)
 */
document.querySelector('#content > div:nth-child(8)').addEventListener('mouseover', alternarFondo);
document.querySelector('#content > div:nth-child(9)').addEventListener('mouseout', alternarFondo);
/*
    mousemove event triggers every time the mouse pointer is moved over the element.
 */
document.querySelector('#content > div:nth-child(10)').addEventListener('mousemove', alternarFondo);
document.querySelector('#content > div:nth-child(11)').addEventListener('wheel', alternarFondo);

document.body.addEventListener('keydown', setFondoRand);

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
window.addEventListener('orientationchange', updateOrient);
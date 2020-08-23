let altVen = document.querySelector('#winH');
let ancVen = document.querySelector('#winW');

let altMon = document.querySelector('#scrH');
let ancMon = document.querySelector('#scrW');

let altRes = document.querySelector('#resH');
let ancRes = document.querySelector('#resW');

function reportWindowSize(e) {
    altVen.textContent = window.innerHeight + 'px';
    ancVen.textContent = window.innerWidth + 'px';
}

function reportScreenSize() {
//    altMon.textContent = window.screen.height + 'px';
    altMon.textContent = screen.height + 'px';
//    ancMon.textContent = window.screen.width + 'px';
    ancMon.textContent = screen.width + 'px';
}
function reportNativeRes() {
    altRes.textContent = (screen.height * window.devicePixelRatio) + 'px';
    ancRes.textContent = (screen.width * window.devicePixelRatio) + 'px';
}

window.onload = e => {
    reportWindowSize(e);
    reportScreenSize();
    reportNativeRes();
};

/*
    Valores del objeto screen no varían al redimensionar la ventana del navegador, 
    por lo que funciones reportScreenSize y reportNativeRes no se incovan en evento onresize
    (no tiene sentido recalcular la resolución si no va a variar)
*/
window.onresize = reportWindowSize; // valores del objeto screen no varían al redimensionar la ventana del navegador

/*
    NOTE: DOMContentLoaded event can only be bound with addEventListener and not with attribute onDOMContentLoaded.
    
    -- This works: --

    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM finished loading");
    });

    -- This does not work: --
    
    document.onDOMContentLoaded = e => {
        console.log("DOM finished loading");
    };
*/

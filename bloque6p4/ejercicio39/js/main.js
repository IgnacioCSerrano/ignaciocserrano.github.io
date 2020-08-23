//https://javascript.info/dispatch-events

let elemento = document.getElementById('elem'),
    evento = new Event("click");

elemento.onclick = e => {
    alert(`Clic realizado por: ${e.isTrusted ? 'usuario' : 'script'}`);
};

//function countdown() {
//    let span = document.querySelector('span');
//    let t = setInterval( () => {
//        span.textContent--;
//    }, 1000);
//    setTimeout( () => {
//        elemento.dispatchEvent(evento);
//        span.textContent = 0;
//        clearInterval(t);
//    }, 5010);
//}

let span = document.querySelector('span');
let tiempo = 5;

function countdown() {
    span.textContent = tiempo;
    if (tiempo > 0) {
        setTimeout(countdown, 1000);
    } else {
        elemento.dispatchEvent(evento); // elemento.click()
    }
    tiempo--;
}
countdown();
const TIEMPO = 3000;
const INTERVALO = 50;    

let overlay = document.createElement("div");
overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    height: 100vh;
    opacity: 1;
    background-color: #e6e0e0;
`;

let contador = document.createElement("div");
contador.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    font-size: xxx-large;
`;
contador.textContent = INTERVALO;

document.body.appendChild(overlay);
document.body.appendChild(contador);

let t = setInterval( () => {
    overlay.style.opacity -= (1 / INTERVALO);
    contador.textContent--;
}, (TIEMPO / INTERVALO));

setTimeout( () => {
    clearInterval(t);
    overlay.remove();
    contador.remove();
}, TIEMPO);

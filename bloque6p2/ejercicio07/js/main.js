let reloj1 = document.querySelector(".reloj:nth-of-type(1)");
let reloj2 = document.querySelector(".reloj:nth-of-type(2)");

let sHor = document.createElement("span");
let sSepHorMin = document.createElement("span");
let sMin = document.createElement("span");
let sSepMinSeg = document.createElement("span");
let sSeg = document.createElement("span");

sSepHorMin.style.fontFamily = "digital-7";
sSepMinSeg.style.fontFamily = "digital-7";
sSepHorMin.textContent = ":";
sSepMinSeg.textContent = ".";

let actualizarReloj = () => {
    let fechaYHoraActual = new Date();
    let horas = fechaYHoraActual.getHours();
    let minutos = fechaYHoraActual.getMinutes();
    let segundos = fechaYHoraActual.getSeconds();
    
//    let hh = ("0" + horas).slice(-2);
    let hh = (horas < 10 ? "0" : "") + horas;
//    let mm = ("0" + minutos).slice(-2);
    let mm = (minutos < 10 ? "0" : "") + minutos;
//    let ss = ("0" + segundos).slice(-2);
    let ss = (segundos < 10 ? "0" : "") + segundos;
    
    reloj1.textContent = `${hh}:${mm}.${ss}`;
    sHor.textContent = hh;
    sMin.textContent = mm;
    sSeg.textContent = ss;
    
//    document.querySelector("title").textContent = `Reloj ${reloj1.textContent}`;
    document.title = `Reloj ${reloj1.textContent}`;
};
actualizarReloj();

reloj2.appendChild(sHor);
reloj2.appendChild(sSepHorMin);
reloj2.appendChild(sMin);
reloj2.appendChild(sSepMinSeg);
reloj2.appendChild(sSeg);

let t = setInterval( () => {
    actualizarReloj();
}, 1000);

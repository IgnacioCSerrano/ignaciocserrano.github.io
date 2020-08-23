const NUM_NOTAS = 3;
let notas = [];
let pesos = [];
let sumaPesos = 0;

let divNotas = document.getElementById("notas");
let divPesos = document.getElementById("pesos");
let divFinal = document.getElementById("final");

let pedirNotas = numero => {
    let notas = [];
    for (let i = 0; i < numero; i++) {
        notas.push(promptEntero(`Introduzca la nota ${i + 1}:`));
    }
    return notas;
};

let pedirPesos = numero => {
    let pesos = [];
    for (let i = 0; i < numero; i++) {
        pesos.push(promptEntero(`Introduzca la ponderación (%) de la nota ${i + 1}:`));
    }
    return pesos;
};

let mostrarNotas = notas => {
    let titulo = document.createElement("h2");
    titulo.textContent = "Notas";
    let lista = document.createElement("ul");
    for (let i = 0; i < notas.length; i++) {
        lista.innerHTML += `<li>${notas[i]}/10</li>`;
    }
    divNotas.appendChild(titulo);
    divNotas.appendChild(lista);
};

let mostrarPesos = pesos => {
    let titulo = document.createElement("h2");
    titulo.textContent = "Pesos";
    let lista = document.createElement("ul");
    for (let i = 0; i < pesos.length; i++) {
        lista.innerHTML += `<li>${pesos[i]}%</li>`;
    }
    let parrafo = document.createElement("p");
    sumaPesos = suma(pesos);
    parrafo.textContent = `Suma de ponderaciones: ${sumaPesos}%`;
    divPesos.appendChild(titulo);
    divPesos.appendChild(lista);
    divPesos.appendChild(parrafo);
};

let getNotafinal = (notas, pesos) => {
    let notaFinal = 0;
    for (let i = 0; i < notas.length; i++) {
        notaFinal += notas[i] * (pesos[i] / 100);
    }
    return notaFinal;
};

let getEstado = notaFinal => {
    let estado;
    switch(notaFinal) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
            estado = "INSUFICIENTE";
            break;
        case 5:
            estado = "SUFICIENTE";
            break;
        case 6:
            estado = "BIEN";
            break;
        case 7:
        case 8:
            estado = "NOTABLE";
            break;
        case 9:
        case 10:
            estado = "SOBRESALIENTE";
            break;
        default:
            estado = "";
    }
    return estado;
};

let mostrarNotaFinal = (notas, pesos) => {
    let parrafo = document.createElement("p");
    if (sumaPesos !== 100) {
        parrafo.textContent = "No es posible calcular la nota final porque las ponderaciones no suman 100%";
    } else {
        let span = document.createElement("span");
        let notaFinal = Math.round( getNotafinal(notas, pesos) );
        let estado = getEstado(notaFinal);
        span.classList.add(notaFinal < 5 ? "rojo" : "verde");
        parrafo.textContent = "Nota final: ";
        span.textContent = `${notaFinal} (${estado})`;
        parrafo.appendChild(span);
    }
    divFinal.appendChild(parrafo);
};

notas = pedirNotas(NUM_NOTAS);
pesos = pedirPesos(NUM_NOTAS);
mostrarNotas(notas);
mostrarPesos(pesos);
mostrarNotaFinal(notas, pesos);

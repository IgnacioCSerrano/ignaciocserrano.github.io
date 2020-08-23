const NUM_NOTAS = 3;
let evaluaciones = [[],[],[]];
let sumaPesos = 0;
let divEval = document.getElementById("evaluaciones");
let divFinal = document.getElementById("final");

//let pedirDatos = numero => {
//    let evaluaciones = [[],[]];
//    for (let i = 0; i < numero; i++) {
//        evaluaciones[0].push(promptEntero(`Introduzca la nota ${i + 1}:`));
//        evaluaciones[1].push(promptEntero(`Introduzca la ponderación (%) de la nota ${i + 1}:`));
//    }
//    return evaluaciones;
//};

let pedirDatos = numero => {
    let evaluaciones = [];
    for (let i = 0; i < numero; i++) {
        evaluaciones[i] = [];
        evaluaciones[i][0] = promptEntero(`Introduzca la nota ${i + 1}:`);
        evaluaciones[i][1] = promptEntero(`Introduzca la ponderación (%) de la nota ${i + 1}:`);
    }
    return evaluaciones;
};

//let generarTabla = evaluaciones => {
//    let tabla = `
//        <thead>
//            <tr>
//                <th>Nota</th>
//                <th>Peso (%)</th>
//            </tr>
//        </thead>
//        </tbody>
//    `;
//    for (let i = 0; i < evaluaciones[0].length; i++) {
//        tabla += `   
//            <tr>
//                <td>${evaluaciones[0][i]}</td>
//                <td>${evaluaciones[1][i]}</td>
//            </tr>
//        `;
//    };
//    return tabla += `
//        </tbody>
//    `;
//};

let generarTabla = evaluaciones => {
    let tabla = `
        <thead>
            <tr>
                <th>Nota</th>
                <th>Peso (%)</th>
            </tr>
        </thead>
        </tbody>
    `;
    evaluaciones.forEach( fila => {
        tabla += `   
            <tr>
                <td>${fila[0]}</td>
                <td>${fila[1]}</td>
            </tr>
        `;
    } );
    return tabla += `
        </tbody>
    `;
};

let getPesos = evaluaciones => {
    let pesos = [];
    for (let i = 0; i < evaluaciones.length; i++) {
        pesos.push(evaluaciones[i][1]);
    }
    return pesos;
};

let mostrarDatos = evaluaciones => {
    let titulo = document.createElement("h2");
    titulo.textContent = "Evaluación";
    let tabla = document.createElement("table");
    tabla.innerHTML = generarTabla(evaluaciones);
    let parrafo = document.createElement("p");
//    sumaPesos = suma(evaluaciones[1]);
    sumaPesos = suma(getPesos(evaluaciones));
    parrafo.textContent = `Suma de ponderaciones: ${sumaPesos}%`;
    divEval.appendChild(titulo);
    divEval.appendChild(tabla);
    divEval.appendChild(parrafo);
};

//let getNotafinal = evaluaciones => {
//    let notaFinal = 0;
//    for (let i = 0; i < evaluaciones[0].length; i++) {
//        notaFinal += evaluaciones[0][i] * (evaluaciones[1][i] / 100);
//    }
//    return notaFinal;
//};

let getNotafinal = evaluaciones => {
    let notaFinal = 0;
    for (let i = 0; i < evaluaciones.length; i++) {
        notaFinal += evaluaciones[i][0] * (evaluaciones[i][1] / 100);
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

let mostrarNotaFinal = evaluaciones => {
    let parrafo = document.createElement("p");
    if (sumaPesos !== 100) {
        parrafo.textContent = "No es posible calcular la nota final porque las ponderaciones no suman 100%";
    } else {
        let span = document.createElement("span");
        let notaFinal = Math.round( getNotafinal(evaluaciones) );
        let estado = getEstado(notaFinal);
        span.classList.add(notaFinal < 5 ? "rojo" : "verde");
        parrafo.textContent = "Nota final: ";
        span.textContent = `${notaFinal} (${estado})`;
        parrafo.appendChild(span);
    }
    divFinal.appendChild(parrafo);
};

evaluaciones = pedirDatos(NUM_NOTAS);
mostrarDatos(evaluaciones);
mostrarNotaFinal(evaluaciones);

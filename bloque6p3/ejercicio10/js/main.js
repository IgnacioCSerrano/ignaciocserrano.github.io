let tabla = document.getElementById('miTabla');

let arrayGSIC = [];

let localidadesASIR = ['Badajoz','Cáceres','Don Benito','Mérida','Navalmoral de la Mata','Plasencia','Zafra'];
let localidadesDAM = ['Almendralejo','Badajoz','Cáceres','Don Benito','Mérida','Navalmoral de la Mata','Plasencia'];
let localidadesDAW = ['Badajoz','Cáceres','Mérida','Navalmoral de la Mata','Plasencia','Zafra'];

arrayGSIC[0] = ['ASIR', 'Administración de Sistemas Informáticos en Red', localidadesASIR];
arrayGSIC[1] = ['DAM', 'Desarrollo de Aplicaciones Multiplataforma', localidadesDAM];
arrayGSIC[2] = ['DAW', 'Desarrollo de Aplicaciones Web', localidadesDAW];


let mostrarArrayV1 = array => {
    console.log('* BUCLE FOR CLÁSICO *');
    for (let i = 0; i < array.length; i++) {
        console.log(`${array[i][0]} (${array[i][1]})`);
        for (let j = 0; j < array[i][2].length; j++) {
            console.log(array[i][2][j]);
        }
    }
};
mostrarArrayV1(arrayGSIC);

let mostrarArrayV2 = array => {
    console.log('* BUCLE FOR OF *');
    for (let fila of array) {
        for (let elemento of fila) {
            console.log(elemento);
        }
    }
};
mostrarArrayV2(arrayGSIC);

let mostrarArrayV3 = array => {
    console.log('* BUCLE FOR EACH *');
    array.forEach( fila => {
        fila.forEach( elemento =>{
            console.log(elemento);
        });
    });
};
mostrarArrayV3(arrayGSIC);

let capitaliseFirst = cadena => {
    return cadena.charAt(0).toUpperCase() + cadena.substring(1).toLowerCase();
};

let comprobarCiclo = (ciclo, poblacion) => {
    for (let i = 0; i < arrayGSIC.length; i++) {
        if (ciclo.toUpperCase() === arrayGSIC[i][0] || ciclo.toLowerCase() === arrayGSIC[i][1].toLowerCase()) {
            return arrayGSIC[i][2].indexOf(capitaliseFirst(poblacion)) !== -1;
        }
    }
    return false;
};

let impartidoEn = ciclo => {
    for (let i = 0; i < arrayGSIC.length; i++) {
        if (ciclo.toUpperCase() === arrayGSIC[i][0] || ciclo.toLowerCase() === arrayGSIC[i][1].toLowerCase()) {
            return arrayGSIC[i][2];
        }
    }
    return [];
};

let insertComa = array => {
    let aux = [...array]; // operador spread permite clonar arrays
    let last = aux.pop();
    return aux.join(', ') + " y " + last;
};

let generarTabla = array => {
    let tabla = `
        <thead>
            <tr>
                <th>CICLO</th>
                <th>Nº POBLACIONES</th>
                <th>LISTADO POBLACIONES</th>
            </tr>
        </thead>
        </tbody>
    `;
    array.forEach( fila => {
        tabla += `   
            <tr>
                <td><abbr title="${fila[1]}">${fila[0]}</abbr></td>
                <td>${fila[2].length}</td>
                <!-- <td>${fila[2].toString()}</td> -->
                <!-- <td>${fila[2].join('-')}</td> -->
                <td>${insertComa(fila[2])}</td>
            </tr>
        `;
    });
    return tabla += `
        </tbody>
    `;
};

tabla.innerHTML = generarTabla(arrayGSIC);
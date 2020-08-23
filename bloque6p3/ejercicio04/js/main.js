const RANDOM_ITEMS = 3;
const MES = "Octubre";
let meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
];

let capitaliseFirst = cadena => {
    return cadena.charAt(0).toUpperCase() + cadena.substring(1).toLowerCase();
};

let generarAleatorio = (min, max) => {
    return parseInt( Math.random() * (max - min) ) + min;
};

let getRandomItems = array => {
    let aux = [];
    while (aux.length < RANDOM_ITEMS && aux.length < array.length) {
        let random = generarAleatorio(0, array.length);
        let item = array[random];
        if (aux.indexOf(item) === -1) {
            aux.push(item);
        }
    }
    return aux;
};

let generarOL = meses => {
    let lista = "<ol>";
    for (let i = 0; i < meses.length; i++) {
        lista += `<li>${capitaliseFirst(meses[i])}</li>`;
    }
    return lista += "</ol>";
};

let generarUL = meses => {
    let lista = "<ul>";
    for (let mes of meses) {
        lista += `<li>${capitaliseFirst(mes)}</li>`;
    }
    return lista += "</ul>";
};

let generarTable = meses => {
    let tabla = `
        <table>
            <thead>
                <tr>
                    <th>Meses</th>
                </tr>
            </thead>
            </tbody>
    `;
    meses.forEach( mes => {
        tabla += `   
                <tr>
                    <td>${capitaliseFirst(mes)}</td>
                </tr>
        `;
    } );
    return tabla += `
            </tbody>
        </table>
    `;
};

let generateDetails = meses => {
    let details = document.createElement("details");
    let aux = getRandomItems(meses);
    details.innerHTML = "<summary>Meses aleatorios</summary>";
    for (let i = 0; i < aux.length; i++) {
        details.innerHTML += `<p>${capitaliseFirst(aux[i])}</p>`;
    }
    details.open = true;
    return details;
};

document.body.innerHTML += generarOL(meses);
document.body.innerHTML += generarUL(meses);
document.body.innerHTML += generarTable(meses);
document.body.appendChild( generateDetails(meses) );
document.body.innerHTML += `<p>Posición ${MES}: ${meses.indexOf(MES.toLowerCase())}</p>`;
/* global fetch, datosJson */

let tablas = document.getElementById("horarios");

function getGrupos() {
    let array = [];
    for (let grupo of datosJson.centro.grupo) {
        array.push(`${grupo._curso}º ${grupo._abreviatura}`);
    }
    return array;
};

let getGruposV2 = () => datosJson.centro.grupo.map( g => `${g._curso}º ${g._familia}` ); // .map(g => { return `${g._curso}º ${g._familia}`; })

function getGruposUL() {
    let lista = "<ul>\n";
    for (let nombre of getGrupos()) {
        lista += `\t<li>${nombre}</li>\n`;
    }
    return lista += "</ul>";
};

let getGruposULV2 = () => "<ul>\n" + getGrupos().reduce( (ac, cv) => `${ac}` + `\t<li>${cv}</li>\n`, "" ) + "</ul>";

let getGrupoJSON = nombre => datosJson.centro.grupo[ getGrupos().indexOf( nombre.toUpperCase() ) ];

let getGrupoJSONV2 = nombre => datosJson.centro.grupo.find( g => `${g._curso}º ${g._abreviatura}` === nombre.toUpperCase() );

let getHoraEntrada = periodo => periodo.split("-")[0];

let getHoraSalida = periodo => periodo.split("-")[1];

let separarHoras = periodo => periodo.replace("-", " - ");

function cambiarOrdenDia(object) {
    return {
        "primeraHora": object.primeraHora,
        "segundaHora": object.segundaHora,
        "terceraHora": object.terceraHora,
        "_recreo": object._recreo,
        "cuartaHora": object.cuartaHora,
        "quintaHora": object.quintaHora,
        "sextaHora": object.sextaHora
    };
}

function generarFilasHorario(horario) {
    let filas = "";
    let i = 0;
    for (let hora in horario) {
        if (hora === "_recreo") {
            filas += `
                <tr>
                    <th scope="row" colspan="6">Recreo</td>
                </tr>
            `;
        } else {
            i++;
            filas += `
                <tr>
                    <th scope="row">${i}º [${separarHoras(horario[hora]._duracion)}]</th>
                    <td>${horario[hora].lunes}</td>
                    <td>${horario[hora].martes}</td>
                    <td>${horario[hora].miercoles}</td>
                    <td>${horario[hora].jueves}</td>
                    <td>${horario[hora].viernes}</td>
                </tr>
            `;
        }
    }
    return filas;
}

function generarFilasModulos(modulos) {
    let filas = "";
    for (let modulo of modulos) {
        filas += `
            <tr>
                <td>${modulo._abreviatura}</td>
                <td colspan="5">${modulo.nombreModulo} (${modulo.horasTotales} horas) - ${modulo.profesor}</td>
            </tr>
        `;
    }
    return filas;
}

function getGrupoTable(nombreGrupo) {
    let grupo, horario, modulos;
    grupo = getGrupoJSONV2(nombreGrupo);
    if (!grupo) {
        return null;
    }
    horario = cambiarOrdenDia(grupo.horario);
    modulos = grupo.modulos.modulo;
    return `
        <table>
            <thead>
                <tr>
                    <th scope="col" colspan="6">TUTOR/A: ${grupo._tutor}</th>
                </tr>
                <tr>
                    <th scope="col" colspan="6">HORARIO ${grupo._curso}º ${grupo._abreviatura}</th>
                </tr>
                <tr>
                    <th scope="col">Hora</th>
                    <th scope="col">Lunes</th>
                    <th scope="col">Martes</th>
                    <th scope="col">Miércoles</th>
                    <th scope="col">Jueves</th>
                    <th scope="col">Viernes</th>
                </tr>
            </thead>
            <tbody> 
                ${generarFilasHorario(horario)}
            </body>
            <tfoot>
                <tr>
                    <th scope="col" colspan="6">
                        ${grupo._curso}º ${grupo._abreviatura} - ${grupo._nivelEducativo} - ${grupo._familia}
                    </th>
                </tr>
                ${generarFilasModulos(modulos)}
            </tfoot>
        </table>
    `;
}

function generarTablas(datos) {
    for (let grupo of datos.centro.grupo) {
        let nombreGrupo = `${grupo._curso}º ${grupo._abreviatura}`;
        tablas.innerHTML += `
            <details>
                <summary>${nombreGrupo} - ${grupo._tutor} - ${datos.centro._cursoEscolar}</summary>
                ${getGrupoTable(nombreGrupo)}
            </details>
        `;
    }
}

// Nota: Fetch API solo es válido con esquema URL (http o https), por lo para que petición 'json/data.json' funcione es necesario que proyecto está subido a servidor

 /*
let datosJson;

let init = {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
    mode: "cors",
    cache: "default"
};

let request = new Request("json/data.json", init); // ruta relativa desde fichero html, desde donde se lanza petición (API Fetch)

//fetch ("json/datos.json")
fetch (request) 
    .then (function(resp) {
        return resp.json();
    })
    .then (function(data) {
        datosJson = data;
        console.log(getGrupos());   
        console.log(getGruposV2());
        console.log(getGruposUL());
        console.log(getGruposULV2());
        console.log(getGrupoJSON("1º daw"));
        console.log(getGrupoJSONV2("1º dam"));
        generarTablas(datosJson);
    });
*/

console.log(getGrupos());   
console.log(getGruposV2());
console.log(getGruposUL());
console.log(getGruposULV2());
console.log(getGrupoJSON("1º daw"));
console.log(getGrupoJSONV2("1º dam"));
generarTablas(datosJson);

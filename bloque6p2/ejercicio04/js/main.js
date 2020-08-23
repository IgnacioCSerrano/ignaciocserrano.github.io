//console.log(document.styleSheets);

const NUM_FILAS = 10;

let caja1 = document.querySelector("div:nth-of-type(1)");
let generarTabla = n => {
    let tabla = `<table>
                    <thead>
                        <tr>
                            <th>Número de fila</th>
                            <th>Tabla de multiplicar</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
    for (let i = 0; i < n; i++) {
        tabla += `      <tr>
                            <td>${i + 1}</td>
                            <td>${tablaMultiplicarUL(i + 1)}</td>
                        </tr>
                `;
    }
    tabla += `      </tbody>
                </table>`;
    return tabla;
};
caja1.innerHTML = generarTabla(NUM_FILAS);

let caja2 = document.querySelector("div:nth-of-type(2)");
let tabla = document.createElement("table");
let cabeza = document.createElement("thead");
tabla.appendChild(cabeza);
let fila = document.createElement("tr");
cabeza.appendChild(fila);
let th1 = document.createElement("th");
fila.appendChild(th1);
th1.textContent = "Número de fila";
let th2 = document.createElement("th");
fila.appendChild(th2);
th2.textContent = "Tabla de multiplicar";
let cuerpo = document.createElement("tbody");
tabla.appendChild(cuerpo);
for (let i = 0; i < NUM_FILAS; i++) {
    let fila = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.textContent = i + 1;
    let td2 = document.createElement("td");
//    td2.innerHTML = tablaMultiplicarUL(i + 1);
    let lista = document.createElement("ul");
    for (let j = 0; j <= 10; j++) {
        let item = document.createElement("li");
        item.textContent = `${i + 1} x ${j} = ${(i + 1) * j}`;
        lista.appendChild(item);
        fila.appendChild(td1);
        fila.appendChild(td2);
    }
    cuerpo.appendChild(fila);
    td2.appendChild(lista);
}
caja2.appendChild(tabla);
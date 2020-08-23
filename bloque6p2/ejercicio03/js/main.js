const NUM_ELEMENTOS = 500;

let caja1 = document.querySelector("div:nth-of-type(1)");
let generarOL = n => {
    let listaOrdenada = "<ol>\n";
    for (let i = 0; i < n; i++) {
        listaOrdenada += `    <li>Elemento ${i + 1}</li>\n`;
    }
    listaOrdenada += "</ol>";
    return listaOrdenada;
};
caja1.innerHTML = generarOL(NUM_ELEMENTOS);

let caja2 = document.querySelector("div:nth-of-type(2)");
let listaOrdenada = document.createElement("ol");
for (let i = 0; i < NUM_ELEMENTOS; i++) {
    let item = document.createElement("li");
    item.textContent = `Elemento ${i + 1}`;
    listaOrdenada.appendChild(item);
}
caja2.appendChild(listaOrdenada);

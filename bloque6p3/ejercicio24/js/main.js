/* global catalogo_cds */

let generarListaCd = arrayCD => {
    let cadena = '';
    for (let i = 0; i < arrayCD.length; i++) {
        cadena += `
            <li>Disco ${i + 1}
                <ul>
                    <li>Título: ${arrayCD[i].Título}</li>
                    <li>Artista: ${arrayCD[i].Artista}</li>
                    <li>Precio: ${arrayCD[i].Precio}</li>
                    <li>Año: ${arrayCD[i].Año}</li>
                </ul>
            </li>
        `;
    }
    return cadena;
};

document.querySelector('div').innerHTML = `
    <ul>
        <li>Fecha: ${catalogo_cds.fecha}</li>
        <li>Catálogo: <ul>${generarListaCd(catalogo_cds.cd)}</ul></li>
    </ul>
`;
/* global datosJSON */

let mostrarCentros = centros => {
    let cadena = '';
    centros.forEach(centro => {
        cadena += `
            <tr>
                <td>${centro.localidad}</td>
                <td>${centro.nombre}</td>
                <td>${centro.modalidad}</td>
            </tr>
        `;
    });
    return cadena;
};

function mostrarDatos(ciclo) {
    document.body.innerHTML += `
        <div class="ciclo">
            <h2>Clave: <span>${ciclo.clave}</span></h2>
            <ul>
                <li>Denominación: <span>${ciclo.nombre}</span></li>
                <li>Nivel: <span>${ciclo.nivel}</span></li>
                <li>Familia Profesional: <span>${ciclo.familia}</span></li>
                <li>Centros:</li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>Localidad</th>
                        <th>Nombre del centro</th>
                        <th>Modalidad</th>
                    </tr>
                </thead>
                <tbody>
                    ${mostrarCentros(ciclo.centros)}
                </tbody>
            </table>
        </div>
    `;
}

datosJSON.GSIC.forEach(ciclo => {
    mostrarDatos(ciclo);
});
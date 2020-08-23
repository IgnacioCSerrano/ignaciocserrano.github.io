/* global fetch */

let consultaSparqlCyB = {
    "default-graph-uri": "",
    "query": `select ?rdfs_label ?schema_email ?schema_url where{
                ?URI a om:CafeBar. 
                ?URI rdfs:label ?rdfs_label.
                OPTIONAL{?URI schema:email ?schema_email. }. 
                OPTIONAL{?URI schema:url ?schema_url. }. 
                }`,
    "format": "json"
};

let url = new URL("http://opendata.caceres.es/sparql");
url.search = new URLSearchParams(consultaSparqlCyB).toString();

let generarFilas = arrayDatos => {
    let cadena = '';
    for (let local of arrayDatos) {
        cadena += `
            <tr>
                <td>${local.rdfs_label.value}</td>
                <td>${local.schema_email ? local.schema_email.value : ''}</td>
                <td>${local.schema_url ? local.schema_url.value : ''}</td>
            </tr>
        `;
    }
    return cadena;
};

function obtenerDatosCyB(url) {
    fetch(url)
        .then ( response => response.json() )
        .then ( datos => {
            console.log(datos);
            document.querySelector('div').innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>CORREO</th>
                            <th>PÁGINA WEB</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generarFilas(datos.results.bindings)}
                    </tbody>
                </table>
            `;
        })
        .catch ( error => console.log(error) );
}

obtenerDatosCyB(url);
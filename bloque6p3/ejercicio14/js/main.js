/* global parkingCC */

let caja = document.getElementById("caja");
let numAparc = parkingCC.results.bindings.length;
caja.innerHTML = `<h2>Número total de aparcamientos: ${numAparc}</h2>`;

parkingCC.fecha = (new Date()).toLocaleString();

parkingCC.results.bindings[numAparc - 1].uri.value = "http://iesvjp.es";

parkingCC.results.bindings.push(
    {
	"uri": {
		"type": "uri",
		"value": "http://iesvjp.es"
	},
	"rdfs_label": {
		"type": "literal",
		"value": "Aparcamiento IESVJP"
	},
	"om_tieneEnlaceSIG": {
		"type": "uri",
		"value": "https://bit.ly/2RMBAf0"
	},
	"geo_lat": {
		"type": "typed-literal",
		"datatype": "http://www.w3.org/2001/XMLSchema#decimal",
		"value": "39.4804019085"
        },
	"geo_long": {
		"type": "typed-literal",
		"datatype": "http://www.w3.org/2001/XMLSchema#decimal",
		"value": "-6.36738283828"
	},
	"om_tipoAparcamiento": {
		"type": "literal",
		"value": "Aparcamiento privado"
	}
    }
);

let aparcamientos = parkingCC.results.bindings;

let generarOL = () => {
    let lista = "<ol>";
    for (let parking of aparcamientos) {
        lista += `<li><a href="${parking.om_tieneEnlaceSIG.value}" target="ventana">${parking.rdfs_label.value}</a></li>`;
    }
    return lista += "</ol>";
};

caja.innerHTML +=`
    <h2>Enlaces SIG de aparcamientos</h2> 
    ${generarOL()}
`;

let generarUL = valor => {
    let lista = "<ul>";
    for (let parking of aparcamientos) {
        if (parking.om_tipoAparcamiento.value === valor) {
            lista += `<li><a href="${parking.om_tieneEnlaceSIG.value}" target="ventana">${parking.rdfs_label.value}</a></li>`;
        }
    }
    return lista += "</ul>";
};

caja.innerHTML +=`
    <h2>Enlaces SIG de aparcamientos en superficie</h2>
    ${generarUL("Aparcamiento en superficie")}
`;

let arrayParkCub = aparcamientos.filter(parking => parking.om_tipoAparcamiento.value === "Parking cubierto");

caja.innerHTML += `<h2>Latitud del décimo aparcamiento: ${aparcamientos[9]["geo_lat"]["value"]}<h2>`;

let generarOL2 = indice => {
    let lista = "<ol>";
    for (let propiedad in aparcamientos[indice]) {
        lista += `<li>${propiedad}</li>`;
    }
    return lista += "</ol>";
};

caja.innerHTML +=`
    <h2>Propiedades del aparcamiento 15</h2>
    ${generarOL2(15)}
`;

caja.innerHTML += `
    <h2>JSON to String</h2>
    <pre>${JSON.stringify(parkingCC, null, 4)}</pre>
`;
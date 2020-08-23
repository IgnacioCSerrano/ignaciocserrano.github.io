/* global fetch */

const CITY = 'Plasencia';
const COUNTRY_CODE = 'ES';
const API_KEY = '5cb4318da9690c3896690a37d82b5c43';

/*
    How to use a CORS proxy to get around “No Access-Control-Allow-Origin header” problems:
    If you don’t control the server your frontend JavaScript code is sending a request to, 
    and the problem with the response from that server is just the lack of the necessary Access-Control-Allow-Origin header, 
    you can still get things to work—by making the request through a CORS proxy.
        https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
 */

let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let url = `${proxyUrl}api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}`; // Call 5 day / 3 hour forecast data

function convKelCel(temp) {
    return (temp - 273.15).toFixed(2);
}

function generarInterv(array) {
    let cadena = '';
    array.forEach(interv => {
        cadena += `
            <tr>    
                <td>${interv.dt_txt.substring(0,10)}</td>
                <td>${interv.dt_txt.substring(11,interv.dt_txt.length)}</td>
                <td>${convKelCel(interv.main.temp)}</td>
                <td>${convKelCel(interv.main.feels_like)}</td>
                <td>${interv.main.humidity}</td>
                <td>${interv.main.pressure}</td>
                <td>${interv.weather[0].main}</td>
            </tr>
        `;
    });
    return cadena;
}

function generarTabla(array) {
    return tabla = `
        <h2>Previsión del tiempo en ${CITY} para los próximos 5 días</h2>
        <table>
            <thead>
                <tr>
                    <th>Día</th>
                    <th>Hora</th>
                    <th>Temperatura (°C)</th>
                    <th>Sensación (°C)</th>
                    <th>Humedad (%)</th>
                    <th>Preción atm (hPa)</th>
                    <th>Tiempo</th>
                </tr>
            </thead>
            <tbody>
                ${generarInterv(array)}
            </tbody>
        </table>
    `;
}

function obtenerDatos(url) {
    fetch(url)
        .then ( response => response.json() )
        .then ( datos => {
            console.log(datos);
            document.getElementById('tabla').innerHTML = generarTabla(datos.list);
        })
        .catch ( error => console.log(error) );
}

obtenerDatos(url); 


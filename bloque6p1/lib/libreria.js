/* global Infinity, parseInt */

/**
 * Función que devuelve el valor en pulgadas correspondiente al valor en metros pasado como parámetro.
 *
 * @param {number} m    Cantidad de metros
 * @return {number}     Cantidad de pulgadas o NaN si parámetro no es un número
 */
let metrosAPulgadas = m => m * 39.3701;

/**
 * Función que devuelve el binomio al cuadrado de dos números pasados como parámetros.
 *
 * @param {number} a    Primer número
 * @param {number} b    Segundo número
 * @return {number}     Resultado de la operación o NaN si algún parámetro no es un número
 */
let binomioAlCuadrado = (a, b) => a * a + b * b + (2 * a * b);

/**
 * Función que genera un código de color RGB aleatorio. 
 *
 * @return {string}     Código de color RGB
 */
let generarRGB = () => {
    var r = Math.floor(Math.random() * 2 ** 8);
    var g = Math.floor(Math.random() * 2 ** 8);
    var b = Math.floor(Math.random() * 2 ** 8);
    return `rgb(${r},${g},${b})`;
};

/**
 * Función que genera un código de color hexadecimal aleatorio.
 *
 * @return {string} Código de color hexadecimal
 */
let generarRGBHex = () => {
    var n = Math.floor(Math.random() * 16 ** 6);
    var hex = "00000" + n.toString(16).toUpperCase();
    return "#" + hex.slice(-6);
};

/**
 * Función que devuelve un código de color hexadecimal correspondiente al código de color RGB 
 * recibido por parámetro. All credits to: https://stackoverflow.com/a/13070198
 *
 * @param {string} rgb  Código de color RGB
 * @return {string}     Código de color hexadecimal
 */
let convertRGBToHex = rgb => {
    let arrayNum = rgb.slice(4, -1).split(",");     // split string into separate numbers
    let arrayHex = arrayNum.map( n => {             // for each array element
        n = parseInt(n).toString(16).toUpperCase(); // convert to a base16 string
        return (n.length === 1) ? "0" + n : n;      // add zero if we get only one character
    });
    return "#" + arrayHex.join("");                 // finally glue it back together
};

/**
 * Función que devuelve la tabla de multiplicar de un número pasado como parámetro (sin control de excepciones).
 *
 * @param {number} n    Número entero
 * @return {string}     Tabla de multiplicar de parámetro
 */
let tablaMultiplicar = n => {
    let i, tabla = "";
    for (i = 0; i < 10; i++) {
        tabla += `${n} x ${i} = ${n * i}\n`;
    }
    tabla += `${n} x ${i} = ${n * i}`;
    return tabla;
};

/**
 * Función que devuelve la tabla de multiplicar de un número pasado como parámetro, en formato de lista no ordenada HTML (sin control de excepciones).
 *
 * @param {number} n    Número entero
 * @return {string}     Lista no ordenada HTML de tabla de multiplicar de parámetro
 */
let tablaMultiplicarUL = n => {
    let lista = "<ul>\n";
    for (let i = 0; i <= 10; i++) {
        lista += `    <li>${n} &times; ${i} = ${n * i}</li>\n`;
    }
    lista += "</ul>";
    return lista;
};

/**
 * Función que eleva un número pasado como primer parámetro a la n-ésima potencia definida por el segundo parámetro (sin control de excepciones).
 *
 * @param {number} x    Número base 
 * @param {numer} n     Número exponente
 * @return {number}     Resultado de la operación
 */
let potencia = (x, n) => {
    let potencia = 1;
    for (let i = 0; i < n; i++) {
        potencia *= x;
    }
    return potencia;
};

/**
 * Función que devuelve el factorial del número pasado como parámetro (sin control de excepciones).
 *
 * @param {number} n    Número entero positivo 
 * @return {number}     Resultado de la operación
 */
let factorial = n => {
    let f = 1;
    for (let i = n; i > 0; i--) {
        f *= i;
    }
    return f;
};

/**
 * Función que devuelve el factorial del número pasado como parámetro (sin control de excepciones) (Versión 2).
 *
 * @param {number} n    Número entero positivo 
 * @return {number}     Resultado de la operación
 */
let factorialV2 = n => {
    if (n === 0) {
        return 1;
    } 
    return n * factorialV2(n - 1);
};

/**
 * Number.isInteger() MDN Polyfill
 */
Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' &&
            isFinite(value) &&
            Math.floor(value) === value;
};

/**
 * Función que determina si el dato pasado como parámetro es o no un número entero.
 *
 * @param {number} n    Número
 * @return {boolean}    Retorna true si parámetro es número entero y false si no lo es
 */
let esInt = n => {
    if (n === "" || n === null) {
        return false;
    }
    return Number.isInteger(Number(n));
};

/**
 * Función que determina si el dato pasado como parámetro es o no un número impar.
 *
 * @param {number} n    Número entero
 * @return {boolean}    Retorna true si parámetro es número impar y false si no lo es
 */
let esImpar = n => {
    if (!Number.isInteger(n)) {
        return false;
    }
    return (n % 2 !== 0);
};

/**
 * Función que determina si el dato pasado como parámetro es o no un número impar (Versión 2).
 *
 * @param {number} n    Número entero  
 * @return {boolean}    Retorna true si parámetro es número impar y false si no lo es
 */
let esImparV2 = n => {
    if (!Number.isInteger(n)) {
        return false;
    }
    return ((n % 2 !== 0) ? true : false);
};

/**
 * Función que retorna un número introducido por pantalla.
 *
 * @return {number|null}    Número introducido por usuario o null 
 */
let promptNumero = (mensaje = "Introduzca un número:") => {
    let n;
    do {
        n = prompt(mensaje);
        if (n === "" || n === null) {
            return null;
        } else if (isNaN(n)) {
            alert("Error: parámetro introducido no es un número.");
        } else {
            return +n;
        }
    } while (isNaN(n));
};

/**
 * Función que retorna un número entero introducido por pantalla.
 *
 * @return {number|null}    Número entero introducido por usuario o null 
 */
let promptEntero = (mensaje = "Introduzca un número entero:") => {
    let n;
    do {
        n = prompt(mensaje);
        if (n === "" || n === null) {
            return null;
        } else if (isNaN(n)) {
            alert("Error: parámetro introducido no es un número.");
        } else if (!esInt(n)) {
            alert("Error: parámetro introducido no es un número entero.");
        } else {
            return +n;
        }
    } while (isNaN(n) || !esInt(n));
};

/**
 * Función que retorna un número real introducido por pantalla.
 *
 * @return {number|null}    Número decimal introducido por usuario o null 
 */
let promptFloat = (mensaje = "Introduzca un número real:") => {
    let n;
    do {
        n = prompt(mensaje);
        if (n === "" || n === null) {
            return null;
        } else if (isNaN(n)) {
            alert("Error: parámetro introducido no es un número.");
        } else {
            return +n;
        }
    } while (isNaN(n));
};

/**
 * Función que retorna el valor mínimo de los elementos de un array numérico.
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Mínimo valor del array o Infinity si array está vacío
 */
let min = arrayDatos => {
    let min = Infinity;
    for (let dato of arrayDatos) {
        min = (dato < min) ? dato : min;
    };
    return min;
};

/**
 * Función que retorna el valor mínimo de los elementos de un array numérico (Versión 2).
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Mínimo valor del array o Infinity si array está vacío
 */
let minV2 = arrayDatos => {
    return Math.min(...arrayDatos);
};

/**
 * Función que retorna el valor máximo de los elementos de un array numérico.
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Máximo valor del array o -Infinity si array está vacío
 */
let max = arrayDatos => {
    let max = -Infinity;
    for (let dato of arrayDatos) {
        max = (dato > max) ? dato : max;
    };
    return max;
};

/**
 * Función que retorna el valor máximo de los elementos de un array numérico (Versión 2).
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Máximo valor del array o -Infinity si array está vacío
 */
let maxV2 = arrayDatos => {
    return Math.max(...arrayDatos);
};

/**
 * Función que retorna la suma de los elementos de un array numérico.
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Suma de los elementos del array o 0 si array está vacío
 */
let suma = arrayDatos => {
    let suma = 0;
    for (let dato of arrayDatos) {
        suma += dato;
    };
    return suma;
};

/**
 * Función que retorna la suma de los elementos de un array numérico (Versión 2).
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Suma de los elementos del array o 0 si array está vacío
 */
let sumaV2 = arrayDatos => {
    return arrayDatos.reduce( (acumulador, valorActual) => acumulador + valorActual, 0 );
};

/**
 * Función que retorna la media de los elementos de un array numérico.
 *
 * @param {object} arrayDatos   Array numérico
 * @return {number}             Media de los elementos del array o 0 si array está vacío
 */
let media = arrayDatos => {
    if (arrayDatos.length === 0) {
        return 0;
    }
    return suma(arrayDatos) / arrayDatos.length;
};

/**
 * Función que calcula la letra correspondiente al DNI recibido como parámetro.
 *
 * @param {number} numDNI   Número de DNI
 * @return {string}         Letra de DNI
 */
let calcularLetraDNI = numDNI => {
    let modulo23 = "TRWAGMYFPDXBNJZSQVHLCKE";
    return (isNaN(numDNI) || numDNI <= 0 || numDNI > 99999999) ? null : modulo23.charAt(numDNI % 23);
};

/**
 * Función que calcula la letra correspondiente al DNI recibido como parámetro.
 *
 * @param {string} NIF  Valor de NIF (número y letra)
 * @return {boolean}    Retorna true NIF está bien formado y false si no lo está
 */
let comprobarDNI = DNI => {
    try {
        let modulo23 = "TRWAGMYFPDXBNJZSQVHLCKE";
        let numDNI = parseInt(DNI);
        let letraDNI = DNI.charAt(DNI.length - 1);
        return modulo23.charAt(numDNI % 23) === letraDNI.toUpperCase();
    } catch (error) {
        return false;
    }
};
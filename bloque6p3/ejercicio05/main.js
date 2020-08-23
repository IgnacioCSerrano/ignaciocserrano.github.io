/* global Infinity */

let min = arrayDatos => {
    let min = Infinity;
    for (let dato of arrayDatos) {
        min = (dato < min) ? dato : min;
    };
    return min;
};

let minV2 = arrayDatos => {
    return Math.min(...arrayDatos);
};

let max = arrayDatos => {
    let max = -Infinity;
    for (let dato of arrayDatos) {
        max = (dato > max) ? dato : max;
    };
    return max;
};

let maxV2 = arrayDatos => {
    return Math.max(...arrayDatos);
};

let suma = arrayDatos => {
    let suma = 0;
    for (let dato of arrayDatos) {
        suma += dato;
    };
    return suma;
};

let sumaV2 = arrayDatos => {
    return arrayDatos.reduce( (acumulador, valorActual) => acumulador + valorActual, 0 );
};

let media = arrayDatos => {
    if (arrayDatos.length === 0) {
        return 0;
    }
    return suma(arrayDatos) / arrayDatos.length;
};

console.log( Math.round( media( [6,4,7,6,8,9] ) ) );
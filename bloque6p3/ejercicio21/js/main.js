let numero = promptEntero("Introduzca el DNI cuya letra desea calcular");
if (numero !== null) {
    alert(`Letra ${calcularLetraDNI(numero)}`);
}

let nif = prompt("Introduzca el NIF completo que desea comprobar");
if (nif !== null) {
    alert(comprobarDNI(nif) ? "NIF correcto" : "NIF incorrecto");
}


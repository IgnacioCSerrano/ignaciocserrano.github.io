let n = promptEntero();

if (n === null) {
    alert("Operación cancelada.");
} else {
    const div = document.querySelector("div");
    div.innerHTML = `<h2>La tabla de multiplicar de ${n} es:</h1> ${tablaMultiplicarUL(n)}`;
}

// CONTROLES CAMBIO COLOR

let inputCF1 = document.getElementById('iColFondo1');
document.getElementById('bColFondo').addEventListener('click', e => {
    let color = document.body.style.backgroundColor;
    document.body.style.backgroundColor = inputCF1.value;
    if (document.body.style.backgroundColor === color) {
        alert('¡Color no válido!');
    }
});

let inputCT1 = document.getElementById('iColTexto1');
document.getElementById('bColTexto').addEventListener('click', e => {
    let color = document.body.style.color;
    document.body.style.color = inputCT1.value;
    if (document.body.style.color === color) {
        alert('¡Color no válido!');
    }
});

let inputCF2 = document.getElementById('iColFondo2');
inputCF2.addEventListener('input', e => {
    document.body.style.backgroundColor = inputCF2.value;
});

let inputCT2 = document.getElementById('iColTexto2');
inputCT2.addEventListener('input', e => {
    document.body.style.color = inputCT2.value;
});

let cuadro = document.getElementById('cuadro'),
        anchoCuadro = cuadro.getBoundingClientRect().width,
        altoCuadro = cuadro.getBoundingClientRect().height;

// CONTROLES RANGO (POSICIONAMIENTO CUADRO)

// COORDENADAS X

let inputCX1 = document.getElementById('iCoordX1'),
        spanCX1 = document.querySelector('#iCoordX1 + span'),
        inputCX2 = document.getElementById('iCoordX2'),
        spanCX2 = document.querySelector('#iCoordX2 + span');

/*
    NOTA: document.documentElement.clientWidth o document.documentElement.scrollWidth retornan el ancho total del documento
    (elemento <html></html>) sin contar la anchura de la barra vertical de scroll, si existe, mientras que window.innerWidth
    sí incluye la dimensión de dicha barra.
    (If the element's content can fit without a need for horizontal scrollbar, its scrollWidth is equal to clientWidth).
*/

//let getWinWidth = () => window.innerWidth;
let getWinWidth = () => document.documentElement.clientWidth;
let anchoVentana = getWinWidth();

// CONTROL RANGE V1 (X)

function updateCX2(valorX) {
    let newValorX = parseInt( (valorX * (anchoVentana - anchoCuadro)) / anchoVentana );
    spanCX2.textContent = newValorX;
    inputCX2.value = newValorX;
}

function setCX1() {
    let valorX = inputCX1.value;
    spanCX1.textContent = valorX;
    cuadro.style.left = ((anchoVentana - anchoCuadro) / anchoVentana) * valorX + '%';
    updateCX2(valorX); // actualiza valor en rango homólogo
}

inputCX1.addEventListener('input', setCX1);

// CONTROL RANGE V2 (X)

let coefMaxX; // coeficiente que mide la diferencia entre el valor real del atributo max (decimal) y el que se muestra en el control (parte entera)

function setMaxCX2() {
    inputCX2.max = ((anchoVentana - anchoCuadro) / anchoVentana) * 100; // si max es decimal, último valor de rango adquiere parte entera (redondeo al suelo)
    coefMaxX = inputCX2.max / parseInt(inputCX2.max);
}
setMaxCX2();

function updateCX1(valorX) {
    let newValorX = Math.round( (valorX * anchoVentana) / (anchoVentana - anchoCuadro) );
    spanCX1.textContent = newValorX;
    inputCX1.value = newValorX;
}

function setCX2() {
    let valorX = inputCX2.value * coefMaxX;
    spanCX2.textContent = parseInt(valorX);
    cuadro.style.left = valorX + "%";
    updateCX1(valorX); // actualiza valor en rango homólogo
}

inputCX2.addEventListener('input', setCX2);

// COORDENADAS Y

let inputCY1 = document.getElementById('iCoordY1'),
        spanCY1 = document.querySelector('#iCoordY1 + span'),
        inputCY2 = document.getElementById('iCoordY2'),
        spanCY2 = document.querySelector('#iCoordY2 + span');

let getWinHeight = () => window.innerHeight;
let altoVentana = getWinHeight();

// CONTROL RANGE V1 (Y)

function updateCY2(valorY) {
    let newValorY = parseInt( (valorY * (altoVentana - altoCuadro)) / altoVentana );
    spanCY2.textContent = newValorY;
    inputCY2.value = newValorY;
}

function setCY1() {
    let valorY = inputCY1.value;
    spanCY1.textContent = valorY;
    cuadro.style.top = ((altoVentana - altoCuadro) / altoVentana) * valorY + '%';
    updateCY2(valorY); // actualiza valor en rango homólogo
}

inputCY1.addEventListener('input', setCY1);

// CONTROL RANGE V2 (Y)

let coefMaxY; // coeficiente que mide la diferencia entre el valor real del atributo max (decimal) y el que se muestra en el control (parte entera)

function setMaxCY2() {
    inputCY2.max = ((altoVentana - altoCuadro) / altoVentana) * 100; // si max es decimal, último valor de rango adquiere parte entera (redondeo al suelo)
    coefMaxY = inputCY2.max / parseInt(inputCY2.max);
}
setMaxCY2();

function updateCY1(valorY) {
    let newValorY = Math.round( (valorY * altoVentana) / (altoVentana - altoCuadro) );
    spanCY1.textContent = newValorY;
    inputCY1.value = newValorY;
}

function setCY2() {
    let valorY = inputCY2.value * coefMaxY;
    spanCY2.textContent = parseInt(valorY);
    cuadro.style.top = valorY + "%";
    updateCY1(valorY); // actualiza valor en rango homólogo
}

inputCY2.addEventListener('input', setCY2);

window.onresize = e => {
    anchoVentana = getWinWidth();
    altoVentana = getWinHeight();
    /*
        Cada vez que se redimensiona la ventana hay que volver a recalcular los valores
        de los atributos max de ambos controles V2.
    */
    setMaxCX2();
    setMaxCY2();
    /*
        Al recalcular los valores de coordenadas en los controles V1 se actualizan 
        en concordancia los de los controles V2 por funciones updateCX2 y updateCY2.
    */
    setCX1();
    setCY1();
    /*
        Nota: es preferible establecer coordenadas V1 y actualizar por efecto coordenadas V2
        que caso contrario porque coordenadas V1 son relativas a las dimensiones de la ventana 
        y conservan una mejor situación del cuadrado en caso de redimensionado.
    */
};

function setInitVal() {
    let iniPosX = cuadro.getBoundingClientRect().left;
    let iniPosY = cuadro.getBoundingClientRect().top;
    let valorX = Math.round((iniPosX / getWinWidth()) * 100);
    let valorY = Math.round((iniPosY / getWinHeight()) * 100);
    /*
        updateCX1 y updateCY1 permiten establecer los valores iniciales 
        de los controles V1 en base a posición incial de cuadro.
    */
    updateCX1(valorX);
    updateCY1(valorY);
    /*
        updateCX2 y updateCY2 permiten establecer los valores iniciales 
        de los controles V2 en base a valores iniciales de controles V1,
        calculados en línea anterior.
    */
    updateCX2(inputCX1.value);
    updateCY2(inputCY1.value);
    /*
        NOTA: es importante actualizar primero CX1 y CY1 con valores X e Y respectivamente
        y posteriormente actualizar CX2 y CY2 con valores de controles V1, 
        ya que orden inverso no funciona.
        Esto es así porque, aunque valorX y valorY son los valores que realmente tienen que mostrar
        controles V2, funciones updateCX2 y updateCY2 no establecen dichos valores al pasarlos como 
        parámetro, sino los recalculados en base a las dimensiones de la ventana (newValorX y newValorY)
    */
}
setInitVal();

// MENÚ CONTEXTUAL

let contMenu = document.getElementById('context_menu');

document.addEventListener('contextmenu', e => {
    e.preventDefault();
    contMenu.style.display = 'initial';
    let mouseX = e.clientX,
        mouseY = e.clientY,
        menuW = contMenu.getBoundingClientRect().width,
        menuH = contMenu.getBoundingClientRect().height;
    contMenu.style.left = (mouseX + menuW > anchoVentana) ? (mouseX - menuW) + 'px' : mouseX + 'px';
    contMenu.style.top = (mouseY + menuH > altoVentana) ? (mouseY - menuH) + 'px' : mouseY + 'px';       
});

document.addEventListener('click', e => {
    if (contMenu.style.display && e.target.parentElement !== contMenu) {
        contMenu.style.cssText = `
            display: '';
            left: '';
            top: '';
        `;
    }
});

contMenu.children[0].addEventListener('click', e => {
//contMenu.firstElementChild.addEventListener('click', e => {
    document.body.classList.remove('design2');
    document.body.classList.add('design1');
});

contMenu.children[1].addEventListener('click', e => {
    document.body.classList.remove('design1');
    document.body.classList.add('design2');
});

contMenu.children[2].addEventListener('click', e => {
//contMenu.lastElementChild.addEventListener('click', e => {
    document.body.classList.remove('design1', 'design2');
});

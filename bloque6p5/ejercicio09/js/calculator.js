/* global calculadora */

// Credits to Adrian Gheorghe https://code.sololearn.com/WK4yOr39W3BW/#html


// ESTRUCTURA HTML 

let calc;

function setStructure() {
    calc = document.createElement('div');
    calc.classList.add('calc-app');
    calc.insertAdjacentHTML('beforeend', `
        <div class="move">
            <img alt="icono movimiento" src="data:image/png;base64,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">
        </div>
        <div class="close">&times;</div>
        <form name="calculadora">
            <input type="text" name="screen" value="0" readonly>
            <input type="hidden" name="operation">
            <div class="botones">
                <input type="button" value="DEL">
                <input type="button" value="AC"><br>
                <input type="button" value="7">
                <input type="button" value="8">
                <input type="button" value="9">
                <input type="button" value="(">
                <input type="button" value=")">
                <input type="button" value="4">
                <input type="button" value="5">
                <input type="button" value="6">
                <input type="button" value="&times;">
                <input type="button" value="&divide;">
                <input type="button" value="1">
                <input type="button" value="2">
                <input type="button" value="3">
                <input type="button" value="&plus;">
                <input type="button" value="&minus;">
                <input type="button" value="0">
                <input type="button" value=".">
                <input type="button" value="EXP">
                <input type="button" value="&Hat;">
                <input type="button" value="&equals;">
            </div>
        </form>
    `);
    document.body.appendChild(calc);
}
setStructure();


// ESTILOS CSS

function setStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .calculator {
            cursor: pointer;
        }
        .calc-app {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            border: 2px solid black;
            border-radius: 12px;
            padding: 20px;
            background-color: lightgrey;
            display: none;
        }
        .calc-app > .move, .calc-app > .close {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            width: 30px;
            height: 30px;
            border: 1px solid black;
            border-radius: 50%;
            color: white;
            user-select: none;
        }
        .calc-app > .move:hover, .calc-app > .close:hover {
            opacity: 0.9;
        }
        .calc-app > .move {
            top: 40px;
            right: -40px;
            background-color: dodgerblue;
            cursor: move;
        }
        .calc-app > .move > img {
            width: 20px;
        }
        .calc-app > .close {
            top: 0;
            right: -40px; 
            font-size: xx-large;
            background-color: firebrick;
            cursor: pointer;
        }
        .calc-app input:focus {
            outline: none;
        }
        .calc-app input[type="button"] {
            background: whitesmoke;
            width: 50px;
            font-size: 16px;
            font-weight: 900;
            border-radius: 7px;
            margin: 3px;
            outline: none;
            height: 30.5px;
        }
        .calc-app input[type="button"]:hover {
            cursor: pointer;
        }
        .calc-app input[type="button"][value="DEL"], input[type="button"][value="AC"] {
            background-color: lightsalmon;
        }
        .calc-app input[type="text"] {
            font-family: monospace;
            text-align: right;
            box-sizing: border-box;
            width: 100%;
            font-size: 24px;
            margin: 5px 0;
            padding: 10px;
            box-shadow: 4px 0px 12px black inset;
        }
        .calc-app .botones {
            margin-top: 10px;
            text-align: right;
        }
    `;
    document.head.appendChild(style);
}
setStyles();


// CÓDIGO CALCULADORA

//function replaceOperators(string) {
//    let mulOpe = /\×/g;
//    let divOpe = /\÷/g;
//    let expOp = /\^/g;
//    return string.replace(mulOpe, '*').replace(divOpe, '/').replace(expOp, '**');
//}

calc.querySelector('.calc-app .botones').onclick = e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        let pantalla = calculadora.screen;
        let oper = calculadora.operation;
        let boton = e.target;
        if (pantalla.value.includes('ERROR')) {
            if (boton.value === 'AC') {
                pantalla.value = '0';
                oper.value = '';
            }
        } else {
            if (boton.value === '=') {
                try {

//                    pantalla.value = eval(replaceOperators(pantalla.value));

                    /*
                        Redondeo evita problemas por la especificación que implementa JavaScript para la precisión de coma flotante
                        (IEEE 754 standard binary64) que provoca comportamientos inesperados (0.1 + 0.2 = 0.30000000000000004)
                            https://medium.com/javascript-in-plain-english/why-0-1-0-2-0-3-in-javascript-d7e218224a72
                            https://medium.com/better-programming/why-is-0-1-0-2-not-equal-to-0-3-in-most-programming-languages-99432310d476

                    */
                    pantalla.value = Math.round(eval(oper.value) * 1e15) / 1e15;
                    if (pantalla.value == Infinity) { // no funciona con ingualdad estricta (===) porque propiedad value de input es string e Infity es number
                        throw 'Math ERROR';
                    }
                    oper.value = pantalla.value;
                } catch (err) {
                    err = err instanceof Object ? 'Syntax ERROR' : err;
                    pantalla.value = err;
                    oper.value = '';
                } 
            } else if (boton.value === 'AC') {
                pantalla.value = '0';
                oper.value = '';
            } else if (boton.value === 'DEL') {
                pantalla.value = (pantalla.value.length > 1) ? pantalla.value.slice(0, -1) : '0';
                oper.value = (oper.value.length > 1) ? oper.value.slice(0, -1) : '0';
            } else if (boton.value === 'EXP') {
                pantalla.value = (pantalla.value === '0') ? 'e' : pantalla.value + 'e';
                oper.value += '*10**';
            } else {
                /*
                    Otra solución para resolver el reemplazo de valores en los botones especiales sería
                    crear un conjunto de input hidden debajo de cada botón con el valor real que se 
                    puede evaluar con eval y usarlo para construir la cadena oculta de oper.value
                */
                pantalla.value = (pantalla.value === '0' && boton.value !== '.') ? boton.value : pantalla.value + boton.value;
                oper.value += boton.value === '×' 
                    ? '*' 
                    : ( boton.value === '÷' 
                        ? '/' 
                        : ( boton.value === '^'
                            ? '**'
                            : boton.value ) );
            }
        }
    }
};

document.querySelector('.calc-app > .close').onclick = e => {
    e.stopPropagation();
    calc.style.removeProperty('top');
    calc.style.removeProperty('left');
    calc.style.display = 'none';
};

// How TO - Create a Draggable HTML Element. Credits to https://www.w3schools.com/howto/howto_js_draggable.asp

let pos1 = 0, 
    pos2 = 0, 
    pos3 = 0, 
    pos4 = 0;

document.querySelector('.calc-app > .move').onmousedown = dragMouseDown;

function dragMouseDown(e) {
    e.preventDefault();
        // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
}

function elementDrag(e) {
    e.preventDefault();
        // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
        // set the element's new position:
    calc.style.top = (calc.offsetTop - pos2) + 'px';
    calc.style.left = (calc.offsetLeft - pos1) + 'px';
}

function closeDragElement() { // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
}

// Calculadora se abre o cierra al hacer clic sobre cualquier elemento que contenga la clase 'calculator'

function toggleCalc() {
    calc.style.display = calc.style.display === 'block' ? 'none' : 'block';
}

document.body.addEventListener('click', e => {
    if (e.target.classList.contains('calculator')) {
        toggleCalc();
    }
});

// Calculadora se abre o cierra al presionar simultáneamente la combinación de teclas 'Ctrl + Alt + c' (minúscula o mayúscula) 

function reportKeyEvent(e) {
    let cKey = e.key === 'c' || e.key === 'C';
    if (e.ctrlKey && e.altKey && cKey) {
        e.preventDefault();
        e.stopPropagation();
        toggleCalc();
    }
}

document.addEventListener('keydown', reportKeyEvent);

// https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

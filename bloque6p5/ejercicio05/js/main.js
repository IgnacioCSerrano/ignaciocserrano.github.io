let generado = false;

let inputA = document.getElementById('inputA'),
    inputB = document.getElementById('inputB'),
    inputC = document.getElementById('inputC'),
    pSoluc = document.querySelector('#solucion > p'),
    pFormu = document.getElementById('formula'),
    grafico = document.querySelector('#graph');

let A, B, C;

function calcEc(a, b, c) {
    pSoluc.parentNode.classList.remove('oculto');
    let rad = Math.sqrt(b ** 2 - (4 * a * c));
    if (a === 0) {
        pSoluc.textContent = 'A no puede ser 0';
        showTempl();
    } else if (isNaN(rad)) {
        pSoluc.textContent = 'Radicando no puede ser negativo';
        showTempl();
    } else {
        pFormu.classList.remove('oculto');
        let s1 = (-b + rad) / (2 * a);
        let s2 = (-b - rad) / (2 * a);
        pSoluc.innerHTML = `Soluciones:<br>x₁ = ${Math.round(s1 * 100000) / 100000}<br>x₂ = ${Math.round(s2 * 100000) / 100000}`;
        A = a;
        B = b;
        C = c;
        printGraph();
        generado = true;
    }
}

function showSolution() {
    pFormu.classList.add('oculto');
    let a = parseInt(inputA.value);
    let b = parseInt(inputB.value);
    let c = parseInt(inputC.value);
    if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
        calcEc(a, b, c);
    }
}

document.getElementById('button').addEventListener('click', showSolution);

document.getElementById('form').addEventListener('input', e => {
    if (generado) {
        showSolution();
    }
});

/*
    Propiedad title adquiere valor que se establece en primera llamada a functionPlot (función de biblioteca importada) pero a diferencia del resto de propiedades, 
    no se actualiza en sucesivas llamadas de función al mismo target aunque se indique un valor distinto en objeto options, aunque sí se puede borrar.
    Por lo tanto hay dos soluciones para actualizar el título: invocar dos veces a la función en cada llamada (la primera con options sin title y la segunda
    con title de options actualizado) o bien accediendo manualmente desde el DOM al elemento que contiene el título (text.title) y modificando su contenido.
*/
function updateTitle() {
    let monomio1 = (A === 1 ? '' : A) + 'x² ';
    let monomio2 = B === 0 ? '' : (( (B > 0 ? ('+ ' + (B === 1 ? '' : B) ) : ('- ' + (B === -1 ? '' : -B) )) ) + 'x ');
    let monomio3 = C === 0 ? '' : (C > 0 ? '+ ' + C : '- ' + -C);
    return 'y = ' + monomio1 + monomio2 + monomio3;
};

// To update a graphic one needs to call functionPlot on the same target element with any object that is configured properly

let options = {
    title: ' ',
    target: '#graph',
    width: 580,
    height: 400,
    disableZoom: false,
    xAxis: {
        label: 'eje x'
    },
    yAxis: {
        label: 'eje y'
    },
    data: []
};

function printGraph() { // functionPlot recibe un objeto como parámetro con las propiedades de la gráfica a representar
    
//    functionPlot({
//        title: 'y = ax² + bx + c',
//        target: '#graph',
//        width: 580,
//        height: 400,
//        disableZoom: false,
//        xAxis: {
//            label: 'eje x'
//        },
//        yAxis: {
//            label: 'eje y'
//        },
//        data: [{
//            fn: `${A} * x^2 + ${B} * x + ${C}`,
//            color: 'red'
//        }]
//    });
    
    options.data[0] = {
        fn: `${A} * x^2 + ${B} * x + ${C}`, // ecuación y = ax² + bx + c
        color: 'red'
    };
//    delete options.title;
//    functionPlot(options);
//    options.title = updateTitle();
    functionPlot(options);
    document.querySelector('#graph text.title').textContent = updateTitle();
}

function showTempl() {
    options.data[0] = {
        fn: '0', // ecuación y = 0 (eje horizontal abscisas)
        color: '#dadada'
    };
//    delete options.title;
//    functionPlot(options);
//    options.title = 'y = ax² + bx + c';
    functionPlot(options);
    document.querySelector('#graph text.title').textContent = 'y = ax² + bx + c';
}
showTempl();

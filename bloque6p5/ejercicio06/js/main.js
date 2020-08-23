let url, 
    windowName = 'ventana', 
    windowFeatures;
    
let f = []; // window features' values array

//let f = new Array(6);

//for (let i = 0; i < f.length; i++) {
//    f[i] = 0;
//}

/*
    How to toggle value between 1 and 0 (set 1 if previous value was 0 and vice versa):
        v = 1 - v;
    or
        v ^= 1; (^ is bitwise XOR operator: sets each bit to 1 if only one of two bits is 1)
    These two operation only work if we guarantee that initial value is always 1 or 0
*/

const urlInput = document.getElementById('url'),
      nodeListCC = document.querySelectorAll('input[type="checkbox"]'), // node list of all check input controls
      wInput = document.getElementById('width'),
      hInput = document.getElementById('height'),
      btnGo = document.getElementById('btnGo'),
      codeDisplay = document.getElementById('code');

function generarCadena() {
    url = urlInput.value ? `${urlInput.value}` : '';
    nodeListCC.forEach( (checkbox, i) => {
        f[i] = checkbox.checked ? 1 : 0;
    });
    let w = wInput.value ? `,width=${wInput.value}` : '';
    let h = hInput.value ? `,height=${hInput.value}` : '';
    windowFeatures = `toolbar=${f[0]},location=${f[1]},status=${f[2]},menubar=${f[3]},scrollbars=${f[4]},resizable=${f[5]}` + w + h;
    return `window.open("${url}","${windowName}","${windowFeatures}")`;
}

function showString() {
    codeDisplay.textContent = generarCadena();
    btnGo.disabled = false;
}

document.getElementById('btnGen').addEventListener('click', showString);

document.querySelector('form').addEventListener('input', showString);

function testCode() {
//    eval(cadena);
    window.open(url, windowName, windowFeatures); // es muy sencillo descomponer la cadena y así prescindir de la "malvada" eval()
}

btnGo.addEventListener('click', testCode);
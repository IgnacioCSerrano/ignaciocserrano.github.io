const inpFil = document.getElementById('nFil'),
        inpCol = document.getElementById('nCol'),
        inpHeadFil = document.getElementById('headFil'),
        inpHeadCol = document.getElementById('headCol'),
        inpTabClass = document.getElementById('tabClass'),
        inpTabId = document.getElementById('tabId'),
        codeDisplay = document.getElementById('tableCode'),
        copyButton = document.getElementById('copyButton');

function setTHeadValidity() {
    inpFil.setCustomValidity((inpFil.value === '1' && inpHeadFil.checked) ? 'Para generar un encabezado en la primera fila son necesarias al menos dos filas' : '');
}

inpFil.addEventListener('change', setTHeadValidity);

inpHeadFil.addEventListener('change', setTHeadValidity);

function genId() {
//    if (inpTabId.value) {
//        return ` id="${inpTabId.value}"`;
//    } else {
//        return '';
//    }
    return inpTabId.value ? ` id="${inpTabId.value}"` : '';
}

function genClass() {
//    if (inpTabClass.value) {
//        return ` class="${inpTabClass.value}"`;
//    } else {
//        return '';
//    }
    return inpTabClass.value ? ` class="${inpTabClass.value}"` : '';
}

function genRow(i) {
    let cadena = '    <tr>\n';
    if (inpHeadCol.checked) {
        cadena += `      <th scope="row">[${i},1]</th>\n`;
    }
    let nColum = inpHeadCol.checked ? (inpCol.value - 1) : inpCol.value;
    for (let cont = 1, j = (inpHeadCol.checked ? (cont + 1) : cont); cont <= nColum; cont++, j++) {
//        cadena += `      <td>[${i},${inpHeadCol.checked ? (cont + 1) : cont}]</td>\n`;
        cadena += `      <td>[${i},${j}]</td>\n`;
    }
    return cadena += '    </tr>\n';
}

function genTBody() {
    let cadena = '  <tbody>\n';
    let nFilas = inpHeadFil.checked ? inpFil.value - 1 : inpFil.value;
    for (let cont = 1, i = (inpHeadFil.checked ? (cont + 1) : cont); cont <= nFilas; cont++, i++) {
//        cadena += genRow( (inpHeadFil.checked ? (cont + 1) : cont) );
        cadena += genRow(i);
    }
    return cadena += '  </tbody>';
}

function genTHead() {
    let cadena = '  <thead>\n    <tr>\n';
    for (let j = 1; j <= inpCol.value; j++) {
        cadena += `      <th scope="col">[1,${j}]</th>\n`;
    }
    return cadena += '    </tr>\n  </thead>\n';
}

function genTabla() {
    let cadena = '';
    if (inpHeadFil.checked) {
        cadena += genTHead();
    }
    cadena += genTBody();
    return cadena;
}

document.getElementById('formulario').onsubmit = e => {
    e.preventDefault();
    codeDisplay.textContent = `<table${genId()}${genClass()}>\n${genTabla()}\n</table>`;
    copyButton.classList.remove('d-none');

};

function copyToClipboard(value) {
    let tempTextArea = document.createElement("textarea");
    tempTextArea.value = value;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    /*
     NOTE: document.execCommand feature is obsolete. Although it may still work in some browsers, 
     its use is discouraged since it could be removed at any time. Try to avoid using it.
     */
    document.execCommand("copy"); // execCommand method runs commands that manipulate the current editable region, such as form inputs or contentEditable elements.
    document.body.removeChild(tempTextArea);
}

copyButton.onclick = e => {
    copyToClipboard(codeDisplay.textContent);
    copyButton.classList.add('rubberBand');
    setTimeout( () => {
        copyButton.classList.remove('rubberBand');
    }, 1000);
};




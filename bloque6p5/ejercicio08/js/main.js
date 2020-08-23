let fieldsetInput = document.querySelectorAll('legend > span > input');

fieldsetInput.forEach(casilla => {
    casilla.addEventListener('input', e => {
        let adyacente;
        let fieldset = casilla.closest('fieldset');
        if (casilla.id.includes('Desh')) {
            fieldset.disabled = casilla.checked;
            adyacente = casilla.closest('span').previousElementSibling.firstElementChild; // casilla adyacente (solo lectura)
        } else { // casilla.id.includes('Lect')
            let controls = fieldset.querySelectorAll('input, textarea, datalit ,select');
            controls.forEach(control => {
                if (control.tagName.toLowerCase() === 'select') { // select tag in HTML doesn't have a readonly attribute, only a disabled attribute
                    if (control.multiple) {
                        control.querySelectorAll('option').forEach(option => {
                            option.disabled = casilla.checked;
                        });
                        control.classList.toggle('fondo');
                    } else {
                        let inputSelect = control.nextElementSibling;
                        control.classList.toggle('d-none');
                        inputSelect.classList.toggle('d-none');
                        inputSelect.value = control.querySelector(`option[value="${control.value}"]`).textContent;
                    }
                } else {
                    control.readOnly = casilla.checked;
                }
            });
            adyacente = casilla.closest('span').nextElementSibling.firstElementChild; // casilla adyacente (deshabilitado)
        }
        if (casilla.checked && adyacente.checked) {
            adyacente.click(); // HTMLElement.click() method simulates a mouse click on an element
        }
    });
});

document.querySelector('form').addEventListener('submit', e => {
    /*
        Antes de enviar el formulario hay que asegurarse de que las opciones del control select múltiple
        no están desactivadas para que puedan enviarse al servidor, ya que únicamente se desactivan al seleccionar 
        la casilla 'solo lectura' en el fieldset correspondiente (casilla 'deshabilitado' desactiva fieldset completo).
    */
    document.querySelectorAll('select[multiple] > option').forEach(option => {
        option.disabled = false;
    });
    /*
        También es necesario asegurarse de que todas las casillas de la cabecera del fielset estén deseleccionadas
        porque de no ser así, aquellas que estuviesen checadas antes de enviar los datos mantendrán su estado al
        volver atrás desde la página del servidor, aunque no conservarán su funcionalidad (solo lectura o deshabilitado).
    */
    fieldsetInput.forEach(casilla => {
        casilla.checked = false;
    });
});

const fileSelector = document.getElementById('exampleFile');
const container = document.getElementById('thumb-container');
const botonReset = document.getElementById('resetSel');

/*
    It could be used firstChild instead of lastChild, but in computer-science in general, it's significantly faster 
    to remove the last element of a collection than it is to remove the first element.
*/
function removeAllChildNodes(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

function resetFileInput() {
    fileSelector.value = ''; // vacía fileList
    document.querySelector('.custom-file-label').textContent = 'Subir imágenes';
    botonReset.classList.add('d-none');
}

let truncate = (fileName, n) => (fileName.length > n) ? (fileName.substr(0, n - 8) + ' &hellip; ' + fileName.slice(-7)): fileName; // truncate long strings

function readImage(file) {
    if (file.type && file.type.indexOf('image') === -1) { // check whether the file is an image
        console.log('File is not an image.', file.type, file);
        return;
    }
    const reader = new FileReader();
    
    /*
        Al invocar función readImage, se crea reader (const reader = new FileReader), se adjunta listener (reader.addEventListener) 
        y se lee fichero como dato URL (reader.readAsDataURL); una vez finalizado evento change de fileSelector, 
        se va ejecutando el código del bloque reader.addEventListener para cada reader que se haya creado (uno o más de uno en función
        de si se han seleccionado una o varias imágenes) y es entonces se renderizan las imagenes en el DOM.
        Por este motivo es importante evaluar al incio si fileSelector tiene o no value, porque cuando una de las imágenes elegidas
        pesa más de 1MB, el evento change finaliza prematuramente (return) y se vacía fileList, pero si alguna imagen previa pesase menos de 1MB, 
        entonces ya se ha creado un reader para esa imagen o imágenes y se renderizarán en el DOM a pesar de no hay ninguna imagen lista 
        para ser subida al servidor (por haber vaciado fileList, es decir, limpiar valor de fileSelector)
    */
   
//    debugger;

    reader.addEventListener('load', e => { // este bloque se ejecuta (para cada reader) al final de evento change de fileSelector y no al invocar función readImage
        if (fileSelector.value) {
            let div = document.createElement('div');
            div.classList.add('rounded');
            let img = document.createElement('img');
            img.src = e.target.result;
            let span = document.createElement('span');
            span.innerHTML = `${( truncate(file.name, 14) ).toLowerCase()}<br>(${(file.size / 1024).toFixed(1)}k)`;
            div.appendChild(img);
            div.appendChild(span);
            container.appendChild(div);
        }
    });
    reader.readAsDataURL(file);
}

function showThumb() {
    const fileList = fileSelector.files;

    removeAllChildNodes(container); // elimina todas las imágenes que pudieran quedar de subida anterior
    
    /*
        CAUTION: clearing innerHTML or textContent (setting to empty string) is also a way to remove all child nodes in a DOM element, 
        but it is not recommended for the following reasons:
        - Not suitable for high-performance applications for invoking the browser's HTML parser (only innerHTML; textContent just
          replaces all children of the element with a single #text node without making the browser invoke their their HTML parser).
        - Don't remove the event handlers of the child nodes, which might cause a memory leak.
            https://stackoverflow.com/a/3955238
            https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    */
   
//    container.innerHTML = ''; 
//    container.textContent = ''; 

//    let files = [];
    for (let file of fileList) {
        /*
            The HTMLInputElement interface [HTML5] has a readonly FileList attribute, 
            which means that it is not possible to delete only several of the selected files, 
            but you can delete the entire file list by setting the value property of the input object to an empty string
                https://stackoverflow.com/a/3162319
        */
        if (file.size > 1048576) { // 1048576 bytes = 1 Megabyte
            alert('¡No se admiten imágenes de más de 1MB!');
            resetFileInput();
            return;
        } else {
//            files.push(file.name);
            readImage(file);
        }
    }
//    document.querySelector('.custom-file-label').textContent = files.join(', ');
    document.querySelector('.custom-file-label').textContent = fileList.length === 0 
        ? 'Subir imágenes' : (fileList.length === 1 ? '1 imagen' 
        : `${fileList.length} imágenes`);
    if (fileList.length === 0) {
        botonReset.classList.add('d-none');
    } else {
        botonReset.classList.remove('d-none');
    }
}

fileSelector.addEventListener('change', showThumb);

botonReset.addEventListener('click', e => {
    /*
        Al estar el botón dentro de form, envía los datos del formulario al servidor cuando es pulsado (type="submit");
        para evitar esto hay que establecer atributo type="button" o bien prevenir el comportamiento por defecto.
    */
   
//    e.preventDefault();

    removeAllChildNodes(container);
    resetFileInput();
});

const dropArea = document.body;

dropArea.addEventListener('dragover', e => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy'; // style the drag-and-drop as a "copy file" operation.
});

dropArea.addEventListener('drop', e => {
    e.stopPropagation();
    e.preventDefault();
    fileSelector.files = e.dataTransfer.files; // al arrastrar una imagen o conjunto a cualquier parte del cuerpo del dodumento (dropArea) se adjuntan a input file
    showThumb();
});

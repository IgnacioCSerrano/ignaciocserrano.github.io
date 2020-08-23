const COLOR_FONDO = 'rgb(156, 220, 156)';
const TIEMPO = 1000;
const TIPO_EV = 'Drag and Drop';
const eventosPedidos = ['drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop']; // array de eventos pedidos en enunciado

let eventosAProbar = Object.getOwnPropertyNames(document)
    .concat(
        Object.getOwnPropertyNames(
                Object.getPrototypeOf(Object.getPrototypeOf(document))
            )
        )
    .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window)))
    .filter(function (i) {
        return (
            !i.indexOf("on") &&
            (document[i] === null || typeof document[i] === "function")
        );
    })
    .filter(function (elem, pos, self) {
        return self.indexOf(elem) === pos;
    })
    .map(attEvento => attEvento.slice(2))
    .sort();

let arrayTimer = []; // array de temporizadores

let victory = false;

document.getElementById('tipoEv').textContent = TIPO_EV;
document.querySelector('h2').insertAdjacentHTML('beforebegin', `<p style="text-align:center">EVENTOS RESTANTES: <span id="count">${eventosPedidos.length}</span></p>`);

function generarLista(eventos) {
    let lista = document.createElement('ul');
    let listItems = '';
    for (let evento of eventos) {
        listItems += `<li data-tipo-evento="${evento}" draggable="true">${evento}: <span>0</span></li>\n`;
    }
    lista.innerHTML = listItems;
    document.body.appendChild(lista);
}
generarLista(eventosAProbar);

let objetoJSON = [];
for (let i = 0; i < eventosAProbar.length; i++) {
    let listItem = document.querySelector(`[data-tipo-evento="${eventosAProbar[i]}"`);
    objetoJSON[i] = {
        "evento": eventosAProbar[i],
        "elemento": listItem,
        "contador": listItem.querySelector('span').textContent,
        "temporizador": null
    };
}

function checkWin(caja) {
    let message = document.getElementById('congrats');
    if ( (caja.getElementsByClassName('wrong').length === 0) && (caja.getElementsByClassName('right').length === eventosPedidos.length) ) {
        if (message) {
            message.style.display = '';
        } else {
            /*
                Avoid using .innerHTML += "..." type of solution at all cost because it's an awfully destructive and expensive approach.
            */
//            document.querySelector('h2').innerHTML += '<br><span id="congrats" style="color:green">¡ENHORABUENA, HAS COMPLETADO EL EJERCICIO!</span>';
            document.querySelector('h2').insertAdjacentHTML('beforeend', '<br><span id="congrats" style="color:green">¡ENHORABUENA, HAS COMPLETADO EL EJERCICIO!</span>');
            victory = true;
        }
    } else if (message && !message.style.display) {
        message.style.display = 'none';
    }
    document.getElementById('count').textContent = eventosPedidos.length - caja.getElementsByClassName('right').length;
}

/*
    Al arrastrar (drag) un elemento se guarda (dataTransfer.setData) información en texto plano referida a un atributo único (id o en este caso dataset),
    de manera que al soltarlo (drop) se recupera esa información (dataTransfer.getData) y se emplea para seleccionar el elemento (querySelector) 
    y desplazarlo de su posición original al objeto donde se ha soltado (appendChild)
*/

function drag(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.tipoEvento);
}

function drop(e) {
    e.preventDefault();
    let data = e.dataTransfer.getData("text");
    let listItem = document.querySelector(`[data-tipo-evento="${data}"`);
    let caja = document.getElementById('caja');
    if (e.currentTarget === caja) {
//        if (eventosPedidos.includes(data)) {
//            listItem.classList.add('right');
//        } else {
//            return;
//        }
        if (victory) {
            return; // si jugador ha ganado ya no es posible arrastrar más eventos de la lista a la caja (a no ser que saque alguno de los que ya están en la caja)
        }
        listItem.classList.add( (eventosPedidos.includes(data)) ? 'right' : 'wrong' );
    } else {
        if (victory) {
            victory = false;
        }
        listItem.classList.remove('right', 'wrong');
    }
    e.currentTarget.appendChild(listItem);
    checkWin(caja);
}

function allowDrop(e) {
    e.preventDefault();
}

function addDragListeners() {
    let caja = document.getElementById('caja');
    let lista = document.querySelector('ul');
    caja.addEventListener('dragover', allowDrop);
    lista.addEventListener('dragover', allowDrop);
    caja.addEventListener('drop', drop);
    lista.addEventListener('drop', drop);
}
addDragListeners();

function addListListeners(eventos, temp, object) {
    for (let i = 0; i < eventos.length; i++) {
        let listItem = document.querySelector(`[data-tipo-evento="${eventos[i]}"`);
        document.addEventListener(eventos[i], e => {
            clearTimeout(temp[i]); // detiene setTimeOut previo para evitar solape de evento actual con anterior en eliminación de color de fondo
            temp[i] = window.setTimeout(() => {
                listItem.removeAttribute('style');
            }, TIEMPO);
            listItem.style.backgroundColor = COLOR_FONDO;
            listItem.querySelector('span').textContent++;
            object[i].contador = listItem.querySelector('span').textContent;
            object[i].temporizador = temp[i];
        });
        listItem.addEventListener('dragstart', drag);
    }
}
addListListeners(eventosAProbar, arrayTimer, objetoJSON);

document.addEventListener('contextmenu', e => {
    e.preventDefault();
});

const COLOR_FONDO = 'rgb(156, 220, 156)';
const TIEMPO = 1000;

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

function generarLista(eventos) {
    let lista = document.createElement('ul');
    let listItems = '';
    for (let evento of eventos) {
        listItems += `<li data-tipo-evento="${evento}">${evento}: <span>0</span></li>\n`;
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
console.log(objetoJSON);

function addListeners(eventos, temp, object) {
    for (let i = 0; i < eventos.length; i++) {
        document.addEventListener(eventos[i], e => {
            let listItem = document.querySelector(`[data-tipo-evento="${eventos[i]}"`);
            clearTimeout(temp[i]); // detiene setTimeOut previo para evitar solape de evento actual con anterior en eliminación de color de fondo
            temp[i] = window.setTimeout(() => {
                listItem.removeAttribute('style');
            }, TIEMPO);
            listItem.style.backgroundColor = COLOR_FONDO;
            listItem.querySelector('span').textContent++;
            object[i].contador = listItem.querySelector('span').textContent;
            object[i].temporizador = temp[i];
        });
    }
}
addListeners(eventosAProbar, arrayTimer, objetoJSON);

document.addEventListener('contextmenu', e => {
    e.preventDefault();
});


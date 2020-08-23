/* global Symbol */

let lista = document.querySelector("#tareas ul");

let listaEventos = Object.getOwnPropertyNames(document)
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

function getTime() {
    let f = new Date();
    let horas = f.getHours().toString();
    let minutos = f.getMinutes().toString();
    let segundos = f.getSeconds().toString();
    return horas.padStart(2, '0') + ':' + minutos.padStart(2, '0') + ':' + segundos.padStart(2, '0');
}

function handler(e) {
    e.currentTarget.removeEventListener(e.type, handler); // elimina listener en primera llamada para asegurar que solo se dispara una vez
    let listItem = `<li class="item">"${e.type}" <span class="hora">${getTime()}</span>
                        <ul class="oculto">
                            <li>Interfaz: <span>${e[Symbol.toStringTag]}</span></li>
                            <li>Fase propagación (bubbling): <span>${e.bubbles ? 'SÍ' : 'NO'}</span></li>
                            <li>Puede ser cancelado (cancelable): <span>${e.cancelable ? 'SÍ' : 'NO'}</span></li>
                            <li>Elemento (target): <span><code>${e.target.tagName ? e.target.tagName.toLowerCase() : e.target.tagName}</code></span></li>
                        </ul>
                    </li>`;
    lista.insertAdjacentHTML('beforeend', listItem);
    e.target.style.border = 'medium groove crimson';
    e.target.style.margin = '1px';
}

function addListListeners(eventos) {
    for (let evento of eventos) {
        
//        document.addEventListener(evento, function handler(e) {
//            e.currentTarget.removeEventListener(e.type, handler);
//            let listItem = `<li class="item">"${e.type}" <span class="hora">${getTime()}</span>
//                                <ul class="oculto">
//                                    <li>Interfaz: <span>${e[Symbol.toStringTag]}</span></li>
//                                    <li>Fase propagación (bubbling): <span>${e.bubbles ? 'SÍ' : 'NO'}</span></li>
//                                    <li>Puede ser cancelado (cancelable): <span>${e.cancelable ? 'SÍ' : 'NO'}</span></li>
//                                    <li>Elemento (target): <span><code>${e.target.tagName ? e.target.tagName.toLowerCase() : e.target.tagName}</code></span></li>
//                                </ul>
//                            </li>`;
//            lista.insertAdjacentHTML('beforeend', listItem);
//            e.target.style.border = 'medium groove crimson';
//            e.target.style.margin = '1px';
//        });

        document.addEventListener(evento, handler);
    }
}
addListListeners(listaEventos);

lista.addEventListener("click", (e) => {
    let item = e.target.closest('.item');
//    item.children[1].classList.toggle('oculto');
    item.lastElementChild.classList.toggle('oculto');
});

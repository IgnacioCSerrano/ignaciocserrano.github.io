/*
    JavaScript methods are actions that can be performed on objects. 
    A JavaScript method is a property containing a function definition.
*/

const SELECTOR = 'strong';
const el = document.querySelector(SELECTOR);

const eventHandler = {
    handlers: {
        click(e) {
//        click: function(e) {
            // código a ejecutar con el evento click
            console.log('¡HOLA!');
        },
        touchend(e) {
//        touchend: function(e) {
            // código a ejecutar con el evento touchend
            console.log('¡ADIÓS!');
        },
        default(e) {
//        default: function(e) {
            // Código a ejecutar en caso de producirse un evento para el que no hay código asociado
            console.log("Evento no manejado: " + e.type);
        }
    },
    // En función del tipo de evento
    handleEvent(e) { // https://developer.mozilla.org/en-US/docs/Web/API/EventListener/handleEvent
//    handleEvent: function(e) {
        switch (e.type) {
            case "click":
            case "touchstart":
                // Cuando se produce click o touchstart se ejecutará el código
                this.handlers.click(e);
                break;
            case "touchend":
                this.handlers.touchend(e);
                break;
            default:
                this.handlers.default(e);
        }
    }
};

Object.keys(eventHandler.handlers)
//    .map(eventName => el.addEventListener(eventName, eventHandler));
    .forEach(eventName => el.addEventListener(eventName, eventHandler));

/*
    Este código genera un array con las claves (keys) del objeto handlers propiedad del objeto eventHandler, que en este caso son tres métodos:
    ["click", "touchend", "default"]. 
    Después se itera sobre dicho array para asociar al elemento del DOM obtenido al inicio (el) un evento correspondiente al valor actual
    que al producirse llamará al objeto eventHandler (no es función pero es válido como listener porque implementa la interfaz EventListener: 
    método handleEvent sirve como función callback). 
    Eventos touchstart y touchend solo funcionan en dispositivos táctiles (se pueden emular con el device toolbar de Chrome Dev Tools)
*/

document.querySelector('input').addEventListener('focus', eventHandler);

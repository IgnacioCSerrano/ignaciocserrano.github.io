let dniInput = document.getElementById('dni'),
    letraInput = document.getElementById('letraDni'),
    passInput = document.getElementById('password'),
    pMatchInput = document.getElementById('pass_match'),
    boton = document.querySelector('button[type="submit"]');

dniInput.addEventListener('change', e => { // change event (for input element) fires when element has changed its value after losing focus
    e.target.setCustomValidity( (letraInput.value && letraInput.value !== calcularLetraDNI(e.target.value)) ? '¡DNI no corresponde a letra!' : '');
    e.target.reportValidity();
    console.log(e.target.validity.tooShort);
});

letraInput.addEventListener('change', e => {
    e.target.setCustomValidity( (dniInput.value && e.target.value !== calcularLetraDNI(dniInput.value)) ? '¡Letra no corresponde a DNI!' : '');
    e.target.reportValidity();
});

passInput.addEventListener('change', e => {
    e.target.reportValidity();
});

pMatchInput.addEventListener('change', e => {
    e.target.setCustomValidity( (e.target.value !== passInput.value) ? '¡Contraseñas no coinciden!' : '');
    e.target.reportValidity();
});

document.querySelector('form').addEventListener('input', e => { // input event fires everytime element's value changes
    boton.disabled = !e.currentTarget.checkValidity();
});
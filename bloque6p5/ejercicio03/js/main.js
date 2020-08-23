let dniInput = document.getElementById('dni');

dniInput.addEventListener('change', e => {
    e.target.setCustomValidity( (comprobarDNI(e.target.value)) ? '' : 'Letra DNI incorrecta');
    e.target.reportValidity();
});
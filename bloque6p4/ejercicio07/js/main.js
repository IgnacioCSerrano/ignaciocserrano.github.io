document.querySelectorAll('i.fa-check-square').forEach(icono => {
    icono.classList.add('oculto');
});

document.querySelector('div').addEventListener('click', e => {
    if (e.target.closest('p')) {
        let p = e.target.closest('p');
        p.querySelector('i.fa-square').classList.toggle('oculto');
        p.querySelector('i.fa-check-square').classList.toggle('oculto');
        p.querySelector('span').classList.toggle('tachado');
    }
});
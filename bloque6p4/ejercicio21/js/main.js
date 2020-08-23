let menu = document.getElementById('menu');

document.querySelector('nav#menu > div').addEventListener('click', e => {
    menu.classList.add('abierto');
});

document.querySelector('nav#menu > i.fa-times-circle').addEventListener('click', e => {
    menu.classList.remove('abierto');
});
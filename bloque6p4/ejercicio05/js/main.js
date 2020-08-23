document.querySelector('div:nth-of-type(1)').addEventListener('click', e => {
    console.log('Click desde listener en JS');
});

document.querySelector('div:nth-of-type(2)').onclick = e => {
    console.log('Click desde atributo evento en JS');
};
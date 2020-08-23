let alpha = document.querySelector('#zAx > td:nth-child(2)'),
    beta = document.querySelector('#xAx > td:nth-child(2)'),
    gamma = document.querySelector('#yAx > td:nth-child(2)'),
    acceZ = document.querySelector('#zAx > td:nth-child(3)'),
    acceX = document.querySelector('#xAx > td:nth-child(3)'),
    acceY = document.querySelector('#yAx > td:nth-child(3)');


window.addEventListener('deviceorientation', () => { // es posible omitir la definición del parámetro y usar la variable global 'event'
    alpha.textContent = Math.round(event.alpha);
    beta.textContent = Math.round(event.beta);
    gamma.textContent = Math.round(event.gamma);
    console.log(event);
}, true);

window.addEventListener('devicemotion', () => {
    acceZ.textContent = event.acceleration.z;
    acceX.textContent = event.acceleration.x;
    acceY.textContent = event.acceleration.y;
    console.log(event);
});

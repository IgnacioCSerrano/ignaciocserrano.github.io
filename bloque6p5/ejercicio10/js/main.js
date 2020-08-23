// CRONÓMETRO

let contCrono = document.getElementById('cronos');

let i = 0;
let centesimas = [];
let ctrInterv = [];

function startSW(e) {
    let stopwatch = e.currentTarget.closest('.clock');
    let i = stopwatch.dataset.id.slice(5);
    ctrInterv[i] = setInterval( () => {
        centesimas[i]++;
        let c = parseInt(centesimas[i] % 100); // centésimas de segundo
        let cc = (c < 10 ? '0' : '') + c;
        let s = parseInt( (centesimas[i] / 100) % 60 ); // segundos 
        let ss = (s < 10 ? '0' : '') + s;
        let m = parseInt( ( centesimas[i] / (60 * 100) ) % 60) ; //  minutos
        let mm = (m < 10 ? '0' : '') + m;
        let h = parseInt( centesimas[i] / (60 * 60 * 100) ); // horas
        let hh = (h < 10 ? '0' : '') + h;
        stopwatch.querySelector('p > span').textContent = hh + ':' + mm + ':' + ss + '.' + cc;
    }, 10);
    stopwatch.querySelector('button:nth-of-type(1)').classList.add('oculto');
    stopwatch.querySelector('button:nth-of-type(2)').classList.remove('oculto');
}

function pauseSW(e) {
    let stopwatch = e.currentTarget.closest('.clock');
    clearInterval(ctrInterv[stopwatch.dataset.id.slice(5)]);
    stopwatch.querySelector('button:nth-of-type(1)').classList.remove('oculto');
    stopwatch.querySelector('button:nth-of-type(2)').classList.add('oculto');
}

function restartSW(e) {
    let stopwatch = e.currentTarget.closest('.clock'); // si se omite parámetro evento hay que usar identificador 'event' para acceder a objeto
    let i = stopwatch.dataset.id.slice(5);
    clearInterval(ctrInterv[i]);
    centesimas[i] = 0;
    stopwatch.querySelector('p > span').textContent = '00:00:00.00';
    stopwatch.querySelector('button:nth-of-type(1)').classList.remove('oculto');
    stopwatch.querySelector('button:nth-of-type(2)').classList.add('oculto');
}

function rmStopwatch() {
    let stopwatch = event.currentTarget.closest('.clock');
    let i = stopwatch.dataset.id.slice(5);
    clearInterval(ctrInterv[i]);
    /*
        delete operator removes a property from an object (if property is an array's element, 
        it empties the position keeping array's original length)
    */
    delete ctrInterv[i];
    delete centesimas[i];
    stopwatch.previousElementSibling.remove(); // hr element
    stopwatch.remove();
}

/*
    REMEMBER: inline event handlers (event handler HTML attributes) are considered bad practice
    (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Ways_of_using_web_events)
*/
function addStopwatch() {
    let crono = `<hr>
                <div data-id="crono${i}" class="clock">
                    <button onclick="startSW(event)"><i class="fas fa-play"></i></button>
                    <button onclick="pauseSW(event)" class="oculto"><i class="fas fa-pause"></i></button>
                    <p><span>00:00:00.00</span></p>
                    <button onclick="restartSW(event)"><i class="fas fa-stop"></i></button>
                    <span onclick="rmStopwatch()" class="remove"><i class="fas fa-minus-square"></i></span>
                </div>`;
    contCrono.insertAdjacentHTML('beforeend', crono);
    centesimas[i] = 0;
    i++;
}

document.querySelector('p:nth-of-type(1) > span').onclick = addStopwatch;


// TEMPORIZADOR

let contTimer = document.getElementById('timers');
let form = document.getElementById('form');
let inputH = form.querySelector('div:nth-of-type(1) > input');
let inputM = form.querySelector('div:nth-of-type(2) > input');
let inputS = form.querySelector('div:nth-of-type(3) > input');
let ringtone = document.getElementById('ringtone');

let j = 0;
let segundos = [];
let ctrTimeout = [];

function setTimer(timer, j) {
    let s = parseInt(segundos[j] % 60); // segundos 
    let ss = (s < 10 ? '0' : '') + s;
    let m = parseInt( (segundos[j] / 60) % 60) ; //  minutos
    let mm = (m < 10 ? '0' : '') + m;
    let h = parseInt( segundos[j] / (60 * 60) ); // horas
    let hh = (h < 10 ? '0' : '') + h;
    timer.querySelector('p > span').textContent = hh + ':' + mm + ':' + ss;
}

function startT(e) {
    let timer = e.currentTarget.closest('.clock');
    let j = timer.dataset.id.slice(5);
    let a = timer.querySelector('p > span').textContent.split(':');
    segundos[j] = (+a[0]) * 3600 + (+a[1]) * 60 + (+a[2]); // operator + convert numeric string into number type
    function countdown() {
        setTimer(timer, j);
        if (segundos[j] > 0) {
            segundos[j]--;
            ctrTimeout[j] = setTimeout(countdown, 1000);
        } else {
            timer.querySelector('button:nth-of-type(1)').classList.add('oculto');
            timer.querySelector('button:nth-of-type(2)').classList.remove('oculto');
            ringtone.play();
        }
    };
    countdown();
    timer.querySelector('button:nth-of-type(1)').classList.add('oculto');
    timer.querySelector('button:nth-of-type(2)').classList.remove('oculto');
}

function pauseT(e) {
    let timer = e.currentTarget.closest('.clock');
    clearTimeout(ctrTimeout[timer.dataset.id.slice(5)]);
    timer.querySelector('button:nth-of-type(1)').classList.remove('oculto');
    timer.querySelector('button:nth-of-type(2)').classList.add('oculto');
    ringtone.pause();
    ringtone.currentTime = 0;
}

function stopT(e) {
    let timer = e.currentTarget.closest('.clock');
    let j = timer.dataset.id.slice(5);
    clearTimeout(ctrTimeout[j]);
    segundos[j] = 0;
    timer.querySelector('p > span').textContent = '00:00:00';
    timer.querySelector('button:nth-of-type(1)').classList.remove('oculto');
    timer.querySelector('button:nth-of-type(2)').classList.add('oculto');
    ringtone.pause();
    ringtone.currentTime = 0;
}

function rmTimer() {
    let timer = event.currentTarget.closest('.clock');
    let j = timer.dataset.id.slice(5);
    clearTimeout(ctrTimeout[j]);
    delete ctrTimeout[j];
    delete segundos[j];
    timer.previousElementSibling.remove(); // hr element
    timer.remove();
}

function hideForm() {
    form.classList.add('oculto');
}

function showForm(e) {
    form.classList.remove('oculto');
    let timer = e.currentTarget.closest('.clock');
    let j = timer.dataset.id.slice(5);
    let a = timer.querySelector('p > span').textContent.split(':');
    inputH.value = +a[0];
    inputM.value = +a[1];
    inputS.value = +a[2];
    form.querySelector('button:nth-of-type(1)').onclick = e => { // atributo de evento en lugar de addEventListener para sobreescribir funcionalidad y no ir acumulando
        if ( form.querySelector('form').reportValidity() ) {
            segundos[j] = (+inputH.value) * 3600 + (+inputM.value) * 60 + (+inputS.value);
            setTimer(timer, j);
            hideForm();
        }
    };
}

function addTimer() {
    let timer = `<hr>
                <div data-id="timer${j}" class="clock">
                    <button onclick="startT(event)"><i class="fas fa-play"></i></button>
                    <button onclick="pauseT(event)" class="oculto"><i class="fas fa-pause"></i></button>
                    <p onclick="showForm(event)"><span>00:01:00</span></p>
                    <button onclick="stopT(event)"><i class="fas fa-stop"></i></button>
                    <span onclick="rmTimer()" class="remove"><i class="fas fa-minus-square"></i></span>
                </div>`;
    contTimer.insertAdjacentHTML('beforeend', timer);
    segundos[j] = 60;
    j++;
}

form.querySelector('button:nth-of-type(2)').onclick = hideForm;
document.querySelector('p:nth-of-type(2) > span').onclick = addTimer;

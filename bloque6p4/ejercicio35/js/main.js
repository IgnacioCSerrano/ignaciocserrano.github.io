let campo = document.querySelector('input[type="email"]'),
    span = document.querySelector('p > span');

// Credits to: https://www.w3resource.com/javascript-exercises/javascript-string-exercise-6.php

let protectEmail = mail => {
    let splitted = mail.split("@");
//    let ast = splitted[0].replace(/./g, '*'); // replace all characters of string with asterisk
    return splitted[0].substring(0, 2) + "*****@" + splitted[1];
};

document.querySelector('input[type="button"]').addEventListener('click', e => {
    if (campo.value) {
        span.textContent = protectEmail(campo.value);
    }
});

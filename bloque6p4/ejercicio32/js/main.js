let span1 = document.querySelector('li:nth-of-type(1) > span'),
    span2 = document.querySelector('li:nth-of-type(2) > span'),
    span3 = document.querySelector('li:nth-of-type(3) > span'),
    keysPressed = {};


/*
    Several boolean attributes are provided to determine if modifier keys were pressed in conjunction 
    with whatever target key you are interested in. They are:

        ctrlKey   -- The "Control" key was also pressed.
        shiftKey  -- The "Shift" key was also pressed.
        altKey    -- The "Alt" key was also pressed.
        metaKey  - - The "Meta" key was also pressed.
*/

// Credits to https://stackoverflow.com/a/37559790

function reportKeyEvent(e) {
    let keyStr = ['Control', 'Shift', 'Alt', 'Meta'].includes(e.key) ? ']' : e.key + ' ] ';
    let reportStr = 'The [ ' +
        ( e.ctrlKey  ? 'Control ' : '' ) +
        ( e.shiftKey ? 'Shift '   : '' ) +
        ( e.altKey   ? 'Alt '     : '' ) +
        ( e.metaKey  ? 'Meta '    : '' ) +
        keyStr + ' key was pressed.'
    ;
    span1.textContent = reportStr;
    span2.textContent = e.code;
    span3.textContent = e.keyCode;
    console.log(e);
}

document.addEventListener('keydown', reportKeyEvent);

//document.addEventListener('keydown', e => {
//    e.preventDefault();
//    e.stopPropagation();
//    keysPressed[e.key] = true;
//    if (keysPressed['Control'] && e.key !== 'Control') {
//        span1.textContent = `Control + ${e.key}`;
//    } else if (keysPressed['Alt'] && e.key !== 'Alt') {
//        span1.textContent = `Alt + ${e.key}`;
//    } else {
//        span1.textContent = e.key;
//    }
//    span2.textContent = e.code;
//    span3.textContent = e.keyCode;
//    console.log(e);
//});

//document.addEventListener('keyup', e => {
//    delete keysPressed[e.key];
// });
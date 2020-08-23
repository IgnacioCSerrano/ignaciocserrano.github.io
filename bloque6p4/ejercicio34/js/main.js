let span = document.getElementById('color'),
    arrayBM = document.querySelectorAll('#bookmarks > div'),
    i = 0;

function setBodyBC(color) {
    document.body.style.backgroundColor = color;
    span.textContent = color;
}

function removeBookMarkBorder() {
    let bookmark = i > 0 ? arrayBM[i - 1] : arrayBM[arrayBM.length - 1];
    bookmark.classList.remove('border');
}

function setBookmarkBorder() {
    arrayBM[i].classList.add('border');
    i = (arrayBM.length - 1 === i) ? 0 : ++i; // actualiza contador
}

function setBookmarkBC(color) {
    arrayBM[i].style.backgroundColor = color;
    arrayBM[i].classList.add('bookmark');
    removeBookMarkBorder();
    setBookmarkBorder();
}

document.body.addEventListener('keydown', e => {
    if (e.key === ' ') {
        let colorFondo = generarRGBHex();
        setBodyBC(colorFondo);
        setBookmarkBC(colorFondo);
    }
});

document.getElementById('bookmarks').addEventListener('click', e => {
    if ( e.target.classList.contains('bookmark') ) {
        setBodyBC( convertRGBToHex(e.target.style.backgroundColor) );
        removeBookMarkBorder();
//        i = Array.from(arrayBM).findIndex( node => node === e.target); // Array.from() creates a new array
        i = [...arrayBM].findIndex( node => node === e.target); // spread syntax allows an iterable object (node list in this case) to be expanded with array properties
        setBookmarkBorder();
    }
});
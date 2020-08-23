let img = document.querySelector('img');
let anchor = document.querySelector('a');

img.addEventListener('mouseenter', function(e) {
    this.src = 'img/HTML5_1Color_Black.svg';
});

//img.addEventListener('mouseenter', e => {
//    img.src = 'img/HTML5_1Color_Black.svg';
//    console.log(this);
//});

//img.addEventListener('mouseenter', e => {
//    e.target.src = 'img/HTML5_1Color_Black.svg';
//    console.log(this);
//});

//img.addEventListener('mouseenter', e => {
//    e.currentTarget.src = 'img/HTML5_1Color_Black.svg';
//    console.log(this);
//});

img.addEventListener('mouseleave', function(e) {
    this.src = 'img/html4.png';
});

anchor.addEventListener('mouseenter', function(e) {
    img.src = 'img/HTML5_1Color_Black.svg';
    console.log(this); // imposible utilizar this porque hace referencia al objeto que llama la función (en este caso, elemento hipervínculo)
});

anchor.addEventListener('mouseleave', e => {
    img.src = 'img/html4.png';
});

anchor.onclick = e => {
    e.preventDefault();
};
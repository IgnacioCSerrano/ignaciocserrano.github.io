let video = document.querySelector('video');

video.addEventListener('mouseenter', function(e) {
    this.play();
});

video.addEventListener('mouseleave', function(e) {
    this.pause();
});

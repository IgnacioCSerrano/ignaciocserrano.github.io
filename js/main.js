$(document).ready(function() {
    setTimeout( () => {
        $('body').addClass('fondo');
        $('main').show();
        $('#loading').hide();
    }, 3500);
    $('h3').click(function() {
        $(this).next().stop();
        $(this).toggleClass('activo');
        $(this).next().slideToggle('slow');
        $('h3').not(this).removeClass('activo');
        $('h3').not(this).next().slideUp(500);
    });
});
import Game_Land from './Game_Land.html'
import './images/bg-about.png'
import './images/bg-features.png'
import './images/bg-main.png'
import './images/bg-qoutes.png'
import './images/bg-requirements.svg'
import './images/statue.svg'
import './images/gal-image1.png'
import './images/gal-image2.png'
import './images/gal-image3.png'
import './images/qoutes-bg.png'
import './css/Game_Land.css'
import './css/Game_Land-main.css';
import './css/Game_Land-about.css';
import './css/Game_Land-features.css';
import './css/Game_Land-requirements.css';
import './css/Game_Land-qoutes.css';
import './css/Game_Land-news-register.css';
$('#item');
jQuery('#item');
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

$('.gallery').slick({
    dots: true,

});

var fr = document.querySelector("form");

fr.addEventListener("submit", function (e) {
    e.preventDefault();
    //fr.submit();
});

$(function(){
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        var sc = $(this).attr("href"),
            dn = $(sc).offset().top;
        console.log(dn);
        $('html, body').animate({scrollTop: dn}, 1000);
    });
});
import './images/bg-about.png'
import './images/bg-features.png'
import './images/bg-main.png'
import './images/bg-qoutes.png'
import './images/bg-requirements.svg'
import './images/qoutes-bg.png'

import './images/button-arrow.svg'
import './images/ellipse-full.svg'
import './images/ellipse-not-full.svg'
import './images/facebook-icon.svg'
import './images/gal-image1.png'
import './images/gal-image2.png'
import './images/gal-image3.png'
import './images/horizontal-spacer.svg'
import './images/lang-arrow.svg'
import './images/logo.png'
import './images/palka.svg'
import './images/qoute1.png'
import './images/qoute2.png'
import './images/qoute3.png'
import './images/spacer.svg'
import './images/spacer2.svg'
import './images/statue.svg'
import './images/steam-icon.svg'
import './images/twitch-icon.svg'
import './images/twitter-icon.svg'
import './images/xbox-icon.svg'
import './images/youtube-icon.svg'

import './css/Game_Land.css'
import './css/Game_Land-header.css';
import './css/Game_Land-main.css';
import './css/Game_Land-about.css';
import './css/Game_Land-features.css';
import './css/Game_Land-requirements.css';
import './css/Game_Land-qoutes.css';
import './css/Game_Land-news-register.css';
import './css/Game_Land-footer.css'
$('#item');
jQuery('#item');
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

$('.gallery').slick({
    dots: true
});

// $('form').submit(function (e) {
//     e.preventDefault();
//     $.post("/addsubscriber", {address: $('form input').val()});
// });

$('.header .language-and-icons .burger').click(function (e) {
    document.querySelector('.header .side-menu').style.display = "flex";
})

$('.header .side-menu .menu-item').click(function (e) {
    document.querySelector('.header .side-menu').style.display = "none";
})

$(function(){
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var dist = $(this).attr("href"),
            cord = $(dist).offset().top;
        $('html, body').animate({scrollTop: cord}, 1000);
    });
});
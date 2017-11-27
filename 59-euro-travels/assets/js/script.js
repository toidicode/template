///////////////////////////////
// One page Smooth Scrolling
///////////////////////////////
$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    }
});


$(document).ready(function(){
    //googleMap

    function initialize() {
      var mapProp = {
        center:new google.maps.LatLng(24.909438,91.833799),
        zoom:18,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    }

    if(typeof google != 'undefined') google.maps.event.addDomListener(window, 'load', initialize);
});

//flexslider
 $(window).load(function() {
    $('.flexslider').flexslider({
        controlNav: false
    });
  });




$(document).ready(function() {
    //$(".owl-carousel").owlCarousel();

    // static navigationbar
    var changeStyle = $('.navigation');

    function scroll() {
        if ($(window).scrollTop() > 645) {
            changeStyle.addClass('navbar-fixed-top');

        } else {
            changeStyle.removeClass('navbar-fixed-top');
        }
    }

    document.onscroll = scroll;

    $('.visit-carousel').owlCarousel({
        nav: true,
        navText: false,
        dots: false,
        loop: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        }
    });
    $('.header-carousel').owlCarousel({
        items: 1,
        nav: true,
        navText: false,
        dots: false,
        loop: true
    });
     $('.services-owl-carousel').owlCarousel({
        items: 1,
        nav: true,
        navText: false,
        dots: false,
        loop: true
    });
    $('.sponsor-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:false,
        navText:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    });
});
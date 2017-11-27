///////////////////////////////
// Smart Resize
///////////////////////////////

(function($,sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                    timeout = null;
            };
            if (timeout)
                clearTimeout(timeout); else if (execAsap)
                func.apply(obj, args);
                timeout = setTimeout(delayed, threshold || 100);
        };
    }
  
    // smartresize 
    jQuery.fn[sr] = function(fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})

(jQuery,'smartresize');


$(function() {

// ///////////////////////////////
// // Fix the Home Height
// ///////////////////////////////

    var setHomeBannerHeight = function(){
        var homeHeight= $(window).height();
        $('#overlay-1').height(homeHeight);
    }

    setHomeBannerHeight();

///////////////////////////////
// One page Smooth Scrolling
///////////////////////////////

$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
            return false;
        }
    }
});

///////////////////////////////
// Center Home Slideshow Text
///////////////////////////////

function centerHomeBannerText() {
    var bannerText = jQuery('#wrapper .starting-text');
    var bannerTextTop = (jQuery('#wrapper').actual('height')/2) - (jQuery('#wrapper .starting-text').actual('height')/2) - 20;
    bannerText.css('padding-top', bannerTextTop+'px');
    bannerText.show();
}

centerHomeBannerText();

jQuery(window).smartresize(function() {
    setHomeBannerHeight();
    centerHomeBannerText();
});
    
});

$(document).ready(function(){
    new WOW().init();
		$("#client-speech").owlCarousel
		({
			autoPlay: 3000,
			navigation : false, // Show next and prev buttons
			slideSpeed : 700,
			paginationSpeed : 1000,
			singleItem:true
		});

    var setHomeBannerHeight = function(){
   var homeHeight= $(window).height();
   $('#overlay-1').height(homeHeight);
    }
    setHomeBannerHeight();  

       
	});





$(document).ready(function(){

  var menu = $('#navigation-scroll > .navbar');
  var origOffsetY = $('#bottom').offset().top;

  function scroll() {
     if ($(window).scrollTop() > origOffsetY) {
        menu.addClass('navbar-white');
     } else {
        menu.removeClass('navbar-white');
     }
  }

  document.onscroll = scroll;




  $('#screenshots-wrap > a').nivoLightbox({effect: 'fadeScale'});

  $(window).load(function(){
    $('#preloader').fadeOut('slow',function(){$(this).remove();});
  });



  $("#client-speech").owlCarousel({
    autoPlay: 3000,
      navigation : false, // Show next and prev buttons
      slideSpeed : 700,
      paginationSpeed : 1000,
      singleItem: true
  });


  $("#screenshots-wrap").owlCarousel({
      navigation : false,
      pagination: true,
      slideSpeed : 500,
      items: 4
  });


});

// @media (max-width: 515px){
//     .rene
//     {
//         font-size: 70px;
//     }
// }
// @media (max-width: 405px){
//     .heading-text h3
//     {
//         font-size: 45px;
//     }
// }
// @media (max-width: 350px){
//     .rene
//     {
//         font-size: 50px;
//     }
//     .starting-text h2
//     {
//         font-size: 35px;
//     }
// }
// /* 

// .shadow-team
// {
//     background-color: #626262;
//     border-radius: 50%;
//     content: "";
//     height: 14px;
//     left: 14px;
//     position: relative;
//     top: 3px;
//     width: 193px;
// }



//  */

// .ion-ios7-arrow-down {
//     color: #fff;
//     font-size: 3em;
// }


// .navbar-default .navbar-brand:hover, .navbar-default .navbar-brand:focus {
//     color: #FFFFFF;
// }

// .btn-primary {
//     padding-top: 14px;
//     border-color: #39c;
// }
// input[type="submit"]{
//     padding-top: 8px;
//     border-color: #39c;
// }
// input[type="submit"]:hover{
//     color: #fff;
//     background-color: #286090;
//     border-color: #204d74;
// }
// .pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {
//     background-color: #3acab1;
//     border-color: #3acab1;
// }

// .pagination {
//     border-radius: 0;
// }

// .pagination>li:first-child>a, .pagination>li:first-child>span {
//     border-top-left-radius: 0;
//     border-bottom-left-radius: 0;
// }

// .pagination>li:last-child>a, .pagination>li:last-child>span {
//     border-top-right-radius: 0;
//     border-bottom-right-radius: 0;
// }

// .navbar-fixed-top, .navbar-fixed-bottom {
//     position: fixed;
//     z-index: 5;
// }

// .btn-default:hover, .btn-default:focus, .btn-default:active, .btn-default.active, .open>.dropdown-toggle.btn-default {
//     color: #FFF !important;
//     background-color: #39c;
//     border-color: #39c;
// }

// .pagination>li>a, .pagination>li>span {
//     color: #16a085;
// }

// #port-items .col-md-4 {
//     padding: 0;
// }

// .input-group-addon {
//     border-radius: 0;
// }

// @media (max-width: 712px) {

// }

// @media (max-width: 400px) {
//     #port-items .col-xs-6 {
//         width: 100%;
//     }

//     .navbar-fixed-top, 
//     .navbar-fixed-bottom {
//         position: static;
//     }

//     #portfolio .btn {
//         margin-bottom: 10px;
//     }
// }
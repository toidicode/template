
/*=================================
||          Owl Carousel
==================================*/
    $("#header-slider").owlCarousel({

        navigation : true, // Show next and prev buttons
        slideSpeed : 100,
        paginationSpeed : 400,
        singleItem: true,
        autoPlay: true,
        pagination: false,

        // "singleItem:true" is a shortcut for:
        // items : 1, 
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

/*=================================
||          WOW
==================================*/
wow = new WOW(
    {
      boxClass:     'wow',      // default
      animateClass: 'animated', // default
      offset:       0,          // default
      mobile:       true,       // default
      live:         true        // default
    }
  )
wow.init();

/*=================================
||          Smooth Scrooling
==================================*/
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: (target.offset().top - 9)//top navigation height
                    }, 1000);
                    return false;
                }
            }
        });
    });

    
/*====================================================================
            Navbar shrink script
======================================================================*/
$(document).ready(function() {
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('nav').addClass('shrink');
        } 
        else {
            $('nav').removeClass('shrink');
        }
    });
});


$(document).ready(function(){
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $("#logo").attr("src", "images/Logo_stick.png")
        }
        else {
             $("#logo").attr("src", "images/Logo_main.png")
        }
    });
});
/*=================================================================
            Load more button
===================================================================*/

$(document).ready(function () {
    $("#loadMenuContent").click(function(event) {
        
        $.get("php/ajax_menu.html", function(data){
            $('#moreMenuContent').append(data);
        });
        event.preventDefault();
        $(this).hide();
    }) ;
});

$(document).ready(function () {

    var $menuPricing = $('#menu-pricing');
    $menuPricing.mixItUp({
        selectors: {
            target: 'li'
        }
    });

});


/*=================================================
        Showing Icon in placeholder
=====================================================*/

$('.iconified').on('keyup', function() {
    var input = $(this);
    if(input.val().length === 0) {
        input.addClass('empty');
    } else {
        input.removeClass('empty');
    }
});

/*=========================================================
                Scroll  Speed
=======================================================*/

$(function() {  
    jQuery.scrollSpeed(100, 1000);
});
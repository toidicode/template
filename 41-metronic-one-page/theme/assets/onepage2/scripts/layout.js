var Layout = function () {
    
    // detect mobile device
    var isMobileDevice = function() {
        return  ((
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
            navigator.userAgent.match(/Opera Mini/i) ||
            navigator.userAgent.match(/IEMobile/i)
        ) ? true : false);
    }

    // handle on page scroll
    var handleHeaderOnScroll = function() {
        if ($(window).scrollTop() > 60) {
            $("body").addClass("page-on-scroll");
        } else {
            $("body").removeClass("page-on-scroll");
        }
    }

    var handleHeaderFixed = function () {
        //jQuery to collapse the navbar on scroll
        $(window).scroll(function() {
            if ($(".navbar").offset().top > 50) {
                $(".navbar").addClass("top-nav-collapse");
            } else {
                $(".navbar").removeClass("top-nav-collapse");
            }
        });

        //jQuery for page scrolling feature - requires jQuery Easing plugin
        $(function() {
            var padding = 70;

            $('.page-scroll a').on('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top - padding
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            });
        });
 
        //Collapse Navbar When It's Clickicked
        $('.navbar-nav li a, .navbar-brand').on("click", function(event) {
            $(".navbar-collapse.in").collapse('hide');
        });
    }

    var handleParallax = function () {
        jQuery(document).ready(function() {
            jQuery('.parallax').parallax("50%", 0.4);
        })  
    }

    var handleOWL = function () {
        
        var handleActiveSlide = function(type) {            
            var item = $('.owl-carousel .owl-item.center').find('.item');
            var quotaId = item.attr('data-quote');

            $('.client-quote.active').removeClass('active');
            $(quotaId).addClass('active');
        }

        var logos = $(".owl-carousel").owlCarousel({
            pagination: false,
            navigation: false,
            items: 7,
            margin: 0,
            center: true,
            autoplay: true,
            loop: true,
            stopOnHover: true,
            slideSpeed: 400,
            addClassActive: true,
            rewindNav: false,
            touchDrag: true,
            mouseDrag: true,
            responsive : {
                0    : { items: 1},
                320  : { items: 1},
                480  : { items: 1},
                700  : { items: 3},
                975  : { items: 5},
                1200 : { items: 7},
                1400 : { items: 7},
                1600 : { items: 7}
            },
            onTranslated    : function(el) {
                handleActiveSlide('change');
            },
            onInitialized  : function(el) {
                handleActiveSlide('init');
            }
        });
    }

    // handle go to top button
    var handleGo2Top = function () {       
        var Go2TopOperation = function(){
            var CurrentWindowPosition = $(window).scrollTop();// current vertical position
            if (CurrentWindowPosition > 300) {
                $(".go2top").show();
            } else {
                $(".go2top").hide();
            }
        };

        Go2TopOperation();// call headerFix() when the page was loaded
        if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
            $(window).bind("touchend touchcancel touchleave", function(e){
                Go2TopOperation();
            });
        } else {
            $(window).scroll(function() {
                Go2TopOperation();
            });
        }

        $(".go2top").click(function(e) {
            e.preventDefault();
             $("html, body").animate({ scrollTop: 0 }, 600);
        });
    }

    var handleScrollspy = function() {
        var scrollspy = $('body').scrollspy({
            target: '.navbar-fixed-top',
            offset: 80
        });

        // fix active class on page load
        setTimeout(function() {
            $(window).scroll();
        }, 1000);       
    }

    return {
        init: function () {
            // handle go to top button
            handleGo2Top();

            // initial setup for fixed header
            handleHeaderOnScroll();

            // animated navbar toggle
            handleHeaderFixed();

            // Parallax background
            handleParallax();

            // Owl Carousel
            handleOWL();

            // Handle one page scrollspy
            handleScrollspy();

            // handle minimized header on page scroll
            $(window).scroll(function() {
                handleHeaderOnScroll();
                handleHeaderFixed();
                handleParallax();
                handleOWL();
            });
        },

        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },
    };
}();
(function ($) {
    "use strict";

    /////////////////////////////////////////////////////
    var venueAddress = ""; // 
    /////////////////////////////////////////////////// 

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.GoogleMaps();
            fn.MenuSticky();
            fn.MainSlider();
            fn.MainSliderAlign();
            fn.Navigation();
            fn.Carousel();
            fn.Slider();
            fn.Apps();
        },



        // Google Maps
        GoogleMaps: function () {

            var markerInfo = "<h4>" + venueAddress + "</h4>";
            $("#map_canvas").gmap3({
                map: {
                    options: {
                        maxZoom: 15,
                        streetViewControl: false,
                        panControl: true,
                        panControlOptions: {
                            position: google.maps.ControlPosition.RIGHT_CENTER
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.LARGE,
                            position: google.maps.ControlPosition.LEFT_CENTER
                        },
                        mapTypeControl: false

                    }
                },
                infowindow: {
                    address: venueAddress,
                    options: {
                        content: markerInfo
                    }
                },
                marker: {
                    address: venueAddress
                }
            },
                "autofit");
        },



        // Sticky Menu
        MenuSticky: function () {
            var menu = document.querySelector('#menu'),
                origOffsetY = menu.offsetTop + 100;
            function scroll() {
                if ($(window).scrollTop() >= origOffsetY) {
                    $('#menu').addClass('sticky');
                    $('#menu').removeClass('fixed');
                } else {
                    $('#menu').removeClass('sticky');
                    $('#menu').addClass('fixed');
                }
            }
            document.onscroll = scroll;
        },



        // Align Slider Horizontally
        MainSliderAlign: function () {
            var imageWidth, widthFix, container = $('.header-bg');
            function centerImage() {
                imageWidth = container.find('img').width();
                widthFix = imageWidth / 2;
                container.find('img').css('margin-left', -widthFix);
            }
            $(window).on("load resize", centerImage);
        },



        // Main FlexSlider
        MainSlider: function () {
            $(window).load(function () {
                $('.main-slider').flexslider({
                    noCSS: true,
                    touch: false,
                    controlNav: false,
                    directionNav: false,
                    animation: "fade",
                    start: function () {
                        $('#preloader').addClass('ready');
                    }
                });
            });
        },



        // One Page Navigation
        Navigation: function () {
            $('#menu').onePageNav({
                currentClass: 'current',
                scrollSpeed: 500,
                scrollOffset: 60,
                scrollThreshold: 0.2,
                easing: 'swing'
            });
        },



        // Owl Carousel
        Carousel: function () {
            var owl = $("#carousel");
            owl.owlCarousel({
                itemsCustom : [
                    [1200, 4],
                    [970, 3],
                    [768, 2],
                    [360, 1]
                ],
                navigation : false
            });

            $(".next").click(function () {
                owl.trigger('owl.next');
            });

            $(".prev").click(function () {
                owl.trigger('owl.prev');
            });
        },



        // FlexSlider
        Slider: function () {
            $('.flexslider').flexslider({
                noCSS: true,
                touch: false,
                directionNav: false,
                animation: "fade"
            });
        },



        
        // Apps
        Apps: function () {

            // Accordion
            $('.accordion-group').accordion();

            // Go Top
            $('#gotop').click(function () {
                $('html, body').scrollTo($('#header'), 300);
            });

            // Go Register
            $('#goregister').click(function () {
                $('html, body').scrollTo($('#register'), 300);
            });

            // Placeholder for MailChimp Form
            $('#mce-EMAIL').attr('placeholder', 'Your email...');

            // Placeholder's for IE9
            $('input, textarea').placeholder();

            // Responsive Video's
            $(".video").fitVids();

            // Fancy Select
            $('#ticket').fancySelect();

        }


    };

    $(document).ready(function () {
        fn.Launch();
    });

})(jQuery);
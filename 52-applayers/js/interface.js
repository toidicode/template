( function($) {
  'use strict';



  	/*-------------------------------------------------------------------------------
	  Detect mobile device 
	-------------------------------------------------------------------------------*/



	var mobileDevice = false; 

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	  	$('html').addClass('mobile');
	  	mobileDevice = true;
	}

	else{
		$('html').addClass('no-mobile');
		mobileDevice = false;
	}



    /*-------------------------------------------------------------------------------
	  Window load
	-------------------------------------------------------------------------------*/



	$(window).load(function(){

		$('.loader').fadeOut(200);
		$('body').addClass('body-loaded');

    	var wow = new WOW({
		    offset: 0,          
		    mobile: false
		  }
		);
		wow.init();
	});

	var navbar=$('.js-navbar');
	var navbarAffixHeight=76



	/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/



    $('.js-target-scroll').on('click', function() {
        var target = $(this.hash);
        if (target.length) {
            $('html,body').animate({
                scrollTop: (target.offset().top - navbarAffixHeight + 1)
            }, 1000);
            return false;
        }
    });



    /*-------------------------------------------------------------------------------
	  Affix
	-------------------------------------------------------------------------------*/



	navbar.affix({
	  offset: {
	    top: 12
	  }
	});

	navbar.on('affix.bs.affix', function() {
		if (!navbar.hasClass('affix')){
			navbar.addClass('animated fadeInDown');
  			navbar.find('.js-brand-hinge').addClass('animated hinge');
		}
	});

	navbar.on('affix-top.bs.affix', function() {
	  	navbar.removeClass('animated fadeInDown');
	  	navbar.find('.js-brand-hinge').removeClass('animated hinge');
	  	$('.navbar-collapse').collapse('hide');
	});

	if (navbar.hasClass('affix')){
		navbar.find('.js-brand-hinge').addClass('animated hinge');
	}



	/*-------------------------------------------------------------------------------
	 Navbar collapse
	-------------------------------------------------------------------------------*/



	$('.navbar-collapse').on('show.bs.collapse', function () {
	 	navbar.addClass('affix');
  		navbar.find('.js-brand-hinge').addClass('animated hinge');
	});

	$('.navbar-collapse').on('hide.bs.collapse', function () {
		if (navbar.hasClass('affix-top')){
			navbar.removeClass('affix');
  			navbar.find('.js-brand-hinge').removeClass('animated hinge');
		}
	});

	$(".navbar-nav > li > a").on('click', function() {
	    $(".navbar-collapse").collapse('hide');
	});



	/*-------------------------------------------------------------------------------
	 Scrollspy
	-------------------------------------------------------------------------------*/



	$('body').scrollspy({
		offset:  navbarAffixHeight + 1
	});



	/*-------------------------------------------------------------------------------
	  Parallax
	-------------------------------------------------------------------------------*/



	if(!mobileDevice){
		$(window).stellar({
		  	responsive: true,
		  	horizontalScrolling: false,
		  	hideDistantElements: false,
		  	horizontalOffset: 0,
		  	verticalOffset: 0,
		});
	}



	/*-------------------------------------------------------------------------------
	  Background slider
	-------------------------------------------------------------------------------*/



	$(".slideshow").owlCarousel({
    	singleItem : true,
    	transitionStyle : "fadeUp",
    	mouseDrag:false,
    	responsiveRefreshRate : 0,
    	touchDrag:false,
    	autoHeight:true,
    	autoPlay : 10000
	});



	/*-------------------------------------------------------------------------------
	  Portfolio masonry
	-------------------------------------------------------------------------------*/



	$('.js-iso').each(function() {		
		var $container = $(this);
		$container.imagesLoaded( function(){
			$container.isotope({		 
				itemSelector: '.js-iso-item',
				layoutMode: 'masonry',	
				masonry: {
				  columnWidth: '.js-iso-item'
				}	
			});	
		});
    }); 


	$('.filter a').on('click', function() {
		$('.filter .active').removeClass('active');
		$(this).closest('li').addClass('active');
		var selector = $(this).attr('data-filter');
		$('.js-iso').isotope({
			filter: selector,
			animationOptions: {
				duration: 500,
				queue: false
			}
		});
		return false;
	});




	/*-------------------------------------------------------------------------------
	  Video pop-up
	-------------------------------------------------------------------------------*/



	$('.js-play').magnificPopup({
	    type: 'iframe',
	    removalDelay: 300
    });



	/*-------------------------------------------------------------------------------
	  Gallery
	-------------------------------------------------------------------------------*/



	$('.js-gallery').magnificPopup({
		delegate: 'a',
	    type: 'image',
	    removalDelay: 300,
	    tLoading: 'Loading image #%curr%...',
	    gallery: {
	       enabled: true,
	       navigateByImgClick: true,
	       preload:[0,1]
	    },
	    image: {
	       tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
	       titleSrc: function(item) {
	          return item.el.attr('title') + '<small></small>';
	       }
	    }

	});


	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/



	$(".review-carousel").owlCarousel({
		singleItem:true,
	 	autoHeight : true
	});

	$(".partners-carousel").owlCarousel({
		items:4,
    	responsiveRefreshRate : 0,
	});



	/*-------------------------------------------------------------------------------
	  Facts
	-------------------------------------------------------------------------------*/



    function loadFacts(){
        $(".js-counter:in-viewport").each(function() {	
			if (!$(this).hasClass("animated")) {
				$(this).addClass("animated");
				var datacount = $(this).attr("data-value");
	            var $this = $(this);
	            $({Counter: 0}).animate({Counter: datacount}, {
	                duration: 2000,
	                easing: 'swing',
	                step: function () {
	                    $this.text(Math.ceil(this.Counter));
	                }
	            });
			}
		});
    }





	$(window).scroll(function(){
		loadFacts();
	});



	/*-------------------------------------------------------------------------------
	  Reviews carousel
	-------------------------------------------------------------------------------*/


	
	$(".gallery-carousel").owlCarousel({
		singleItem:true,
	 	autoHeight : true,
	 	pagination:false,
	 	navigation:true,
	 	transitionStyle : "fadeUp",
	 	navigationText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
	});



	/*-------------------------------------------------------------------------------
	  Google map
	-------------------------------------------------------------------------------*/



	if ($('.js-gmap').length > 0){
		var map;
		map = new GMaps({
			el: '.js-gmap',
			lat: 45.036537,
			lng:38.995768,
			scrollwheel:false,
			zoom: 15,
			zoomControl : true,
			panControl : false,
			streetViewControl : false,
			mapTypeControl: false,
			overviewMapControl: false,
			clickable: false
		});


		var image = 'img/map-label.png';
		var infoWindow = new google.maps.InfoWindow({
		    
		});

		map.addMarker({
			lat: 45.035732,
			lng:38.995768,
			icon: image,
			animation: google.maps.Animation.DROP,
			verticalAlign: 'bottom',
			horizontalAlign: 'center',
			backgroundColor: '#d3cfcf',
			infoWindow:{
				content: '<div class="map-info">st. Kutuzova 85, Krasnodar<br>Russian Federation</div>'
			}
		});
		  
		var styles = [ 

			{
			  "featureType": "road",
			  "stylers": [
				{ "color": "#333333" }
			  ]
			  	},{
			  "featureType": "landscape",
			  "stylers": [
				{ "color": "#1F1F1F" }
			  ]
				},{
			  "featureType": "water",
			  "stylers": [
				{ "color": "#D4B068" }
			  ]
			  },{
			  "elementType": "labels.text.fill",
			  "stylers": [
				{ "color": "#808080" }
			  ]
			  },{
			  "featureType": "poi",
			  "stylers": [
				{ "color": "#232323" }
			  ]
			  },{
			  "elementType": "labels.text",
			  "stylers": [
				{ "saturation": 1 },
				{ "weight": 0.1 },
				{ "color": "#999999" }
			  ]
			}
	  
		];

		map.addStyle({
			styledMapName:"Styled Map",
			styles: styles,
			mapTypeId: "map_style"  
		});

		map.setStyle("map_style");
	}
	
	

	/*-------------------------------------------------------------------------------
	  Ajax Form
	-------------------------------------------------------------------------------*/



	if ($('.js-ajax-form').length) {
		$('.js-ajax-form').each(function(){
			$(this).validate({
				errorClass: 'error wobble-error',
			    submitHandler: function(form){
		        	$.ajax({
			            type: "POST",
			            url:"mail.php",
			            data: $(form).serialize(),
			            success: function() {
			                $('.modal').modal('hide');
		                	$('#success').modal('show');
		                },

		                error: function(){
			            	$('.modal').modal('hide');
			                $('#error').modal('show');
			            }
			        });
			    }
			});
		});
	}
})(jQuery);

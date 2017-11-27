$(document).ready(function(){
	// OWL CAROUSEL TESTIMONIAL SLIDE
	$(".testimonial-sliders").owlCarousel({
		items:1,
		itemsDesktop : [1170,1], //1 items between 1000px and 901px
      	itemsDesktopSmall : [768,1], // betweem 900px and 601px
      	itemsTablet: [600,1],
		itemsMobile :[479,1],
		pagination:false,
		autoPlay:true,
		singleItem:true,
		navigation:true,
		navigationText:["<img src='images/arrow-right.png'></img>","<img src='images/arrow-left.png'></img>"]
	});

	// OWL CAROUSEL BLOG SLIDE
	$("#blog-carousel").owlCarousel({
		items:3,
		itemsDesktop : [1170,3], //3 items between 1000px and 901px i.ion-ios-arrow-left
      	itemsDesktopSmall : [768,2], // betweem 900px and 601px
      	itemsTablet: [600,2],
		itemsMobile :[479,1],
		pagination:true
	});

	$(".navbar-nav li a").on('click', function(event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			var hash = this.hash;
			var topOffset  = $(hash).offset().top - 90;
			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: topOffset
			}, 800, function(){

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
			$(".navbar-nav li.active").removeClass('active');
			$(this).closest('li').addClass('active');
		} // End if
	});

	/****************************BACK TO TOP************************************/
	$('#scroll-top-div').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });


	$('.popup-youtube').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,

          fixedContentPos: false
        });

});


jQuery(window).on('load',function() {
    jQuery(".cube-wrapper").delay(3000).fadeOut();
    jQuery(".preloader-body").delay(4000).fadeOut();
})
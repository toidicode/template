(function($) {

$(document).ready(function(){


});


// Response plugin
var initResponse = function(){
    Response.create({
        mode: "markup",
        prop: "width",
        prefix: "r",
        breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
    });

    Response.create({
        mode: "src",
        prop: "width",
        prefix: "src",
        breakpoints: [0, 350, 750, 1000, 1200, 1400, 1600]
    });
};
    initResponse();

// Sidebar (menu)
var initSidebar = function(){

	// Toggle sidebar open class on menu trigger click
	$(document).on('tap.sidebar', '.pageHeader .menu-trigger', function(event) {

		$('body').toggleClass('pushed');
		
		event.preventDefault();
	});

	// close sidebar on click off
    $(document).on('tap.sidebar', function() {
        $('body').removeClass('pushed');
    });
    $(document).on('tap.sidebar', '.sidebar, .pageHeader .menu-trigger', function(event){
        event.stopPropagation();
    });

    // Widen menu on hover (desktop)
    $(document).on('mouseover.sidebar', '.sidebar a, .pageHeader', function(event) {

        $('body').addClass('hover-pushed');
    });

    $(document).on('mouseleave.sidebar', '.sidebar, .pageHeader', function(event) {

        $('body').removeClass('hover-pushed');
    });
};
initSidebar();

// Share Menu
var initShareMenu = function(){

    // Toggle sidebar open class on menu trigger click
    $(document).on('tap.shareMenu', '.share-menu-trigger', function(event) {

        $('.shareMenu').toggleClass('open');
        
        event.preventDefault();
    });

    // close shareMenu on click off
    $(document).on('tap.shareMenu', function() {
        $('.shareMenu').removeClass('open');
    });
    $(document).on('tap.shareMenu', '.shareMenu, .share-menu-trigger', function(event){
        event.stopPropagation();
    });
};
initShareMenu();

// Smooth Scroll
var initSmoothScroll = function(){

    // Smooth Scroll
    var scrollOff = 0;
    $(window).on('throttledresize', function(){
        // Adjust scroll offset for hover links
        if(Response.band(0, 1199)){
            scrollOff = $('.pageHeader').height();
        } else {
            scrollOff = 0;
        }
    }).trigger('throttledresize');

    $(document).on('tap.smoothScroll', '.smoothScroll', function(event) {
        var linkto = $(this).attr('href');
        
        $('html, body').animate({
            scrollTop: $(linkto).offset().top - scrollOff
        }, 500);
        
        event.preventDefault();
    });
};
initSmoothScroll();


// Waypoints
var initWaypoints = function(){

    // Add waypoint animations on desktop only
    if( Response.band(1200) ){

        var sectionName = '';

        // section-seperators
        $('.section-seperator').waypoint(function() {
            $(this).addClass('in-point');
        }, { offset: '70%' });

        // Timeline
        $('.timeline li').waypoint(function() {
            $(this).addClass('in-point');
        }, { offset: '95%' });

        // Icon stats
        $('.rounded-icon').waypoint(function() {
            $(this).addClass('in-point');
        }, { offset: '50%' });

        // Audience (B2B - B2C)
        $('.section-audience .container-template').waypoint(function() {
            $(this).addClass('in-point');
        }, { offset: '80%' });

        // Centered Titles
        $('.section-intro h1, headergroup h2').waypoint(function() {
            $(this).addClass('in-point');
        }, { offset: '85%' });

        // Keep side navigation up to date
        $('section').waypoint(function(direction) {
            sectionName = $(this).attr('id');
            $('.mainMenu a[href="#'+ sectionName +'"]').toggleClass('selected', direction === 'down');
        }, { offset: '70%' })
        .waypoint(function(direction) {
            sectionName = $(this).attr('id');
            $('.mainMenu a[href="#'+ sectionName +'"]').toggleClass('selected', direction === 'up');
        }, {
            offset: function() { return -$(this).height()*0.8; }
        });

    } else {
        $('.section-intro h1, headergroup h2, .section-seperator, .timeline li, .rounded-icon, .section-audience .container-template').addClass('in-point');
    }
};
initWaypoints();

// Parallax
var initParallax = function(){

    $.stellar({
        horizontalOffset: 90,
        responsive: true,
    });

    // Turn off (prevent bg position change) on mobile
    $(window).on('throttledresize.parallax', function(event){

        if(! Response.band(1200) ){
            $('.section-membership-section-seperator, .section-intro').addClass('dont-scroll');
        } else {
            $('.section-membership-section-seperator, .section-intro').removeClass('dont-scroll');
        }

    }).trigger('throttledresize');
};
initParallax();

// Statistics
var initStatisics = function(){

    // Bar Chart - waypoint on desktop only
    if( Response.band(1200) ){
        $('.barChart').waypoint(function(direction) {
            setBarChart();
        }, 
        { 
            offset: '60%',
            triggerOnce: true
        });
    } else {
        setBarChart();
    }    

    function setBarChart(){
        $('.barChart').find('.bar').each(function(){
            var height = $(this).data('percentage')-2;
            $(this).height( height+'%');
        });
    }


    // Pie Chart - waypoint on desktop only
    var pieChartSection_count = $('.pieChart .pie-section').length,
        startPoint = 0,
        degrees = 0,
        coord_x = 0,
        coord_y = 0,
        chartRadius = 0;

    // Initial setup (correct start points)
    $('.pieChart .pie-section').each(function(){

        startPoint = $(this).data('start');

        $(this).css({
                    '-webkit-transform' : 'rotate('+ startPoint +'deg)',
                    '-moz-transform' : 'rotate('+ startPoint +'deg)',
                    '-ms-transform' : 'rotate('+ startPoint +'deg)',
                    'transform' : 'rotate('+ startPoint +'deg)',
                    });
    });

    // Labels
    $(window).on('throttledresize.pieChart', function(event){

        chartRadius = $('.pieChart').width()/2;

        // Position Labels
        $('.pieChart .pie-section-label').each(function(){

            // Calculate position of tip (uses trig in php)
            coord_x = $(this).data('x') * (chartRadius+20);
            coord_y = $(this).data('y') * (chartRadius+20);

            // Left or right tip
            if( coord_x < 0 ){
                $(this).addClass('tooltip-left');
                $(this).css({
                        'right' : coord_x*-1,
                        'top' : coord_y
                        });
            } else {
                $(this).addClass('tooltip-right');
                $(this).css({
                        'left' : coord_x,
                        'top' : coord_y
                        });
            }
        });

    }).trigger('throttledresize');

    // Rotate and fade when into view
    if( Response.band(1200) ){
        $('.pieChart').waypoint(function(direction) {
            setPieChart();        
        }, 
        { 
            offset: '60%',
            triggerOnce: true
        });
    } else {
        setPieChart();
    } 

    function setPieChart(){
        $('.pieChart').addClass('in-point');

        $('.pieChart .pie-section').each(function(){

            startPoint = $(this).data('start');
            degrees = $(this).data('degrees')+1;

            $(this).css({
                        '-webkit-transform' : 'rotate('+ startPoint +'deg)',
                        '-moz-transform' : 'rotate('+ startPoint +'deg)',
                        '-ms-transform' : 'rotate('+ startPoint +'deg)',
                        'transform' : 'rotate('+ startPoint +'deg)'
                        });

            $(this).find('.pie-section-before').css({
                        '-webkit-transform' : 'rotate('+ degrees +'deg)',
                        '-moz-transform' : 'rotate('+ degrees +'deg)',
                        '-ms-transform' : 'rotate('+ degrees +'deg)',
                        'transform' : 'rotate('+ degrees +'deg)',
                        'opacity' : '1'
                        });
        });
    }
};

initStatisics();
// Testimonial swiper
var initTestimonialSwiper = function(){
    var testimonialSwiper = new Swiper('.testimonials-container',{
        loop: true,
        simulateTouch: false,
        autoplay: 5000,
        paginationElement: 'div',
        pagination: '.testimonials-pagination',
        paginationClickable: true,
        wrapperClass: 'testimonials-wrapper',
        slideClass: 'testimonials-slide',
        slideElement: 'li',
        calculateHeight: true,
        resizeReInit: true,
    });

    if(testimonialSwiper.browser.ie8){
        testimonialSwiper.destroy(true);
        $('.testimonials-container *').removeAttr('style');
    }
};
initTestimonialSwiper();

// Profile swiper
var initProfileSwiper = function(){
    var profileSwiperOptions = {
            loop: true,
            simulateTouch: false,
            paginationElement: 'div',
            pagination: '.profile-pagination',
            paginationClickable: true,
            wrapperClass: 'profile-wrapper',
            slideClass: 'profile-slide',
            slideElement: 'div',
            resizeReInit: true,
            calculateHeight: true,
            roundLengths: true,
        },
        profileSwiper,
        profileSwiperInit = false;

    // Enable only at 750px+
    $(window).on('throttledresize.profileSwiper', function(event) {

        if(Response.band(750)){
            if(! profileSwiperInit){
                profileSwiper = $('.profile-container').swiper(profileSwiperOptions);
                profileSwiperInit = true;

                if(profileSwiper.browser.ie8){
                    profileSwiper.destroy(true);
                    $('.profile-container *').removeAttr('style');
                }
            }
        } else {
            if(profileSwiperInit){
                $('.profile-container *').removeAttr('style');
                profileSwiper.destroy(true);
                profileSwiperInit = false;
            }
        }
    }).trigger('throttledresize');

    // Attach L/R navigation
    $(document).on('tap.profileSwiper', '.profile-nav', function(event){

        if($(this).hasClass('profile-nav-next')){
            profileSwiper.swipeNext();
        } else if($(this).hasClass('profile-nav-prev')){
            profileSwiper.swipePrev();
        }

        event.preventDefault();
    });
};
initProfileSwiper();

// Pricing swiper
var initPricingSwiper = function(){

    var pricingSwiperOptions = {
            loop: true,
            simulateTouch: false,
            wrapperClass: 'pricing-wrapper',
            slideClass: 'pricing-slide',
            slideElement: 'div',
            calculateHeight: true,

            onSlideChangeStart: function(swiper){
                // Update nav
                currentSlide = swiper.activeLoopIndex;
                $('.pricing-menu li:eq('+ currentSlide +')').addClass('selected').siblings().removeClass('selected');
            },
        },
        pricingSwiper,
        pricingSwiperInit = false;


    // Enable only at 750px+
    $(window).on('throttledresize.pricing', function(event) {

        if(Response.band(750)){
            if(! pricingSwiperInit){
                pricingSwiper = $('.pricing-container').swiper(pricingSwiperOptions);
                pricingSwiperInit = true;

                if(pricingSwiper.browser.ie8){
                    pricingSwiper.destroy(true);
                    $('.pricing-container *').removeAttr('style');
                }
            }
        } else {
            if(pricingSwiperInit){
                $('.pricing-container *').removeAttr('style');
                pricingSwiper.destroy(true);
                pricingSwiperInit = false;
            }
        }
    }).trigger('throttledresize');

    // On nav click
    $(document).on('tap.pricing', '.pricing-menu li', function(event){

        var slideIndex = $(this).index();

        pricingSwiper.swipeTo(slideIndex);

        event.preventDefault();
    });

    // Attach L/R navigation
    $(document).on('tap.pricing', '.pricing-nav', function(event){

        if($(this).hasClass('pricing-nav-next')){
            pricingSwiper.swipeNext();
        } else if($(this).hasClass('pricing-nav-prev')){
            pricingSwiper.swipePrev();
        }

        event.preventDefault();
    });
};
initPricingSwiper();


})( jQuery );
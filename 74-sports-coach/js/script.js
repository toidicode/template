  window.jQuery(function ($) {
            "use strict";

            $('time').countDown({
                with_separators: false
            });
            $('.alt-1').countDown({
                css_class: 'countdown-alt-1'
            });
            $('.alt-2').countDown({
                css_class: 'countdown-alt-2'
            });

        });

$(window).load(function initIso(){

    var $container = $('#container');

    $container.isotope({
        itemSelector : '.element'
    });


    var $optionSets = $('#options .option-set'),
        $optionLinks = $optionSets.find('a');

    $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
            return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');

        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
            // changes in layout modes need extra logic
            changeLayoutMode( $this, options )
        } else {
            // otherwise, apply new options
            $container.isotope( options );
        }

        return false;
    });


});

function debouncer( func , timeout ) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        } , timeout );
    }
}


 $(document).ready(function() {
    "use strict";



        
/*---------------------------------------------------------------- One Page Navigation -------------------*/
	$('.nav').onePageNav({
	filter: ':not(.external)',
	scrollThreshold: 0.25,
	scrollOffset: 60,
	});
         

/*---------------------------------------------------------------- Fixed menu ----------------------------*/
	$('header').scrollToFixed();


/*---------------------------------------------------------------- Slider --------------------------------*/
	$('.carousel').carousel({
      interval: 2000
    });

	
/*-------------------------------------------------------------------------- Tooltip----------------------*/
	if( $.fn.tooltip() ) {
		$('[class="tooltip_hover"]').tooltip();
	}


/*-------------------------------------------------------------- Responsive Video plugin -----------------*/
     jQuery(".video").fitVids();


/*------------------------------------------------------------------------ ToTop -------------------------*/
     var screen = $(document).height();
	 $(window).scroll(function(){
		 if ($(this).scrollTop() > screen - 600) {
			 $('#scroll_up').fadeIn();
		 } else {
			 $('#scroll_up').fadeOut();
		 }
	 }); 
 
	 $('#scroll_up').click(function(){
		 $("html, body").animate({ scrollTop: 0 }, 600);
		 return false;
	 });


});


 

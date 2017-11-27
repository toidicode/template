$('#p1,#p2,#p3,#p4,#p5').hover(function(e){
  $('input[name=textinput]').val($(this).text());
});



(function($) {
	"use strict";
	function count($this){
	var current = parseInt($this.html(), 10);
	current = current + 1; /* Where 50 is increment */	
	$this.html(++current);
		if(current > $this.data('count')){
			$this.html($this.data('count'));
		} else {    
			setTimeout(function(){count($this)}, 50);
		}
	}        	
	$(".stat-count").each(function() {
	  $(this).data('count', parseInt($(this).html(), 10));
	  $(this).html('0');
	  count($(this));
	});
})(jQuery);

/*Scroll Effect*/

			$(document).ready(function(){
				
				//Check to see if the window is top if not then display button
				$(window).scroll(function(){
					if ($(this).scrollTop() > 100) {
						$('.button-totop').fadeIn();
					} else {
						$('.button-totop').fadeOut();
					}
				});
				
				//Click event to scroll to top
				$('.button-totop').click(function(){
					$('html, body').animate({scrollTop : 0},800);
					return false;
				});
				
			});
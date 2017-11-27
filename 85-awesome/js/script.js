

// smartresize 
(function($,sr) 
{
  jQuery.fn[sr] = function(fn) 
  {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  };
})(jQuery,'smartresize');


$(function() 
{

    // Fix the Home Height

    var setHomeBannerHeight = function()
    {
	   var homeHeight= $(window).height();
	   $('#overlay-1').height(homeHeight);
    }
    setHomeBannerHeight();
});


jQuery(document).ready(function(){
  "use strict";$('.social-links a').hover(function(){
    $(this).removeClass().addClass('flip'+' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      ,function(){
      $(this).removeClass()})
  })
});
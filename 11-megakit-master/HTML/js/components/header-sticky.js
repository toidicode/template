// Header Sticky
var HeaderSticky = function() {
  'use strict';

  // Handle Header Sticky
  var handleHeaderSticky = function() {
    // On loading, check to see if more than 15rem, then add the class
    if ($('.js__header-sticky').offset().top > 15) {
      $('.js__header-sticky').addClass('s-header__shrink');
    }

    // On scrolling, check to see if more than 15rem, then add the class
    $(window).on('scroll', function() {
      if ($('.js__header-sticky').offset().top > 15) {
        $('.js__header-sticky').addClass('s-header__shrink');
      } else {
        $('.js__header-sticky').removeClass('s-header__shrink');
      }
    });
  }

  return {
    init: function() {
      handleHeaderSticky(); // initial setup for Header Sticky
    }
  }
}();

$(document).ready(function() {
  HeaderSticky.init();
});
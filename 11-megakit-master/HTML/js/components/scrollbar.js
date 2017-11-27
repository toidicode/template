// Scrollbar
var Scrollbar = function() {
  'use strict';

  // Handle Scrollbar
  var handleScrollbar = function() {
    $('.js__scrollbar').mCustomScrollbar({
      theme: 'minimal'
    });
  }


  return {
    init: function() {
      handleScrollbar(); // initial setup for Scrollbar
    }
  }
}();

$(document).ready(function() {
  Scrollbar.init();
});

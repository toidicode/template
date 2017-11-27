// Parallax
var Parallax = function() {
  'use strict';

  // Handle Parallax
  var handleParallax = function() {
    $('.js__parallax-window').parallax("50%", 0.1);
  }

  return {
    init: function() {
      handleParallax(); // initial setup for Parallax
    }
  }
}();

$(document).ready(function() {
  Parallax.init();
});
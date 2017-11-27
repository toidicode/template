// Wow
var Wow = function() {
  'use strict';

  // Handle Wow
  var handleWow = function() {
    var wow = new WOW({
      mobile: false
  	});
  	wow.init();
  }

  return {
    init: function() {
      handleWow(); // initial setup for Wow
    }
  }
}();

$(document).ready(function() {
  Wow.init();
});
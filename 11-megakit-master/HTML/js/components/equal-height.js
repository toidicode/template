// Equal Height
var EqualHeight = function() {
  "use strict";

  // Handle Equal Height
  var handleEqualHeight = function() {
    $(function($) {
      $('.js__form-eqaul-height-v1').responsiveEqualHeightGrid();
      $('.js__tab-eqaul-height-v1').responsiveEqualHeightGrid();
    });
  }

  return {
    init: function() {
      handleEqualHeight(); // initial setup for equal height
    }
  }
}();

$(document).ready(function() {
    EqualHeight.init();
});
// Circles
var Circle = function() {
  "use strict";

  // Handle Circles
  var handleCircle = function() {
    // Circles 1
    Circles.create({
      id: 'circles-1',
      radius: 65,
      value: 55,
      width: 2,
      textClass: 'g-font-size-24--xs g-color--primary',
      text: function(value) {
        return value + '%';
      },
      colors: ['rgba(16,122,118,.2)', '#13b1cd'],
      duration: 1500
    });

    // Circles 2
    Circles.create({
      id: 'circles-2',
      radius: 65,
      value: 72,
      width: 2,
      textClass: 'g-font-size-24--xs g-color--primary',
      text: function(value) {
        return value + '%';
      },
      colors: ['rgba(16,122,118,.2)', '#13b1cd'],
      duration: 1500
    });

    // Circles 3
    Circles.create({
      id: 'circles-3',
      radius: 65,
      value: 69,
      width: 2,
      textClass: 'g-font-size-24--xs g-color--primary',
      text: function(value) {
        return value + '%';
      },
      colors: ['rgba(16,122,118,.2)', '#13b1cd'],
      duration: 1500
    });

    // Circles 3
    Circles.create({
      id: 'circles-4',
      radius: 65,
      value: 82,
      width: 2,
      textClass: 'g-font-size-24--xs g-color--primary',
      text: function(value) {
        return value + '%';
      },
      colors: ['rgba(16,122,118,.2)', '#13b1cd'],
      duration: 1500
    });
  }

  return {
    init: function() {
      handleCircle(); // initial setup for Circles
    }
  }
}();

$(document).ready(function() {
  Circle.init();
});

// Masonry
var Masonry = function() {
    "use strict";

    // Handle Masonry Grid
    var handleMasonryGrid = function() {
        var $container = $('.masonry-grid');
        // initialize Masonry after all images have loaded
        $container.imagesLoaded(function() {
            $container.masonry({
                itemSelector: '.masonry-grid-item', // use a separate class for itemSelector, other than .col-
                columnWidth: '.masonry-grid-sizer',
                percentPosition: true
            });
        });
    }

    return {
        init: function() {
            handleMasonryGrid(); // initial setup for masonry grid
        }
    }
}();

$(document).ready(function() {
    Masonry.init();
});

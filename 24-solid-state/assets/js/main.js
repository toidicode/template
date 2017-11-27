/*=-=-==-= navbar-scroll  =-=-=-=====-*/

$(document).ready(function(){
  $(window).scroll(function() { // check if scroll event happened
    if ($(document).scrollTop() > 150) { // check if user scrolled more than 450 from top of the browser window
      $(".navbar-solid-state").css({"background-color":"#242d44","color": "#ffffff"}); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      $(".a-transparent").css({"background-color":"transparent","color": "transparent"});
    } else {
      $(".navbar-solid-state").css("background-color", "transparent"); // if not, change it back to transparent
      $(".a-transparent").css({"background-color":"transparent","color": "transparent"});
    }
  });
});

/*=-=-=-===-==-=  Navbar pop-up =-=-=-=-=-=-=-=*/

$(document).ready(function(){

   var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $banner = $('#banner');

    /* // Disable animations/transitions until the page has loaded.
      $body.addClass('is-loading');

      $window.on('load', function() {
        window.setTimeout(function() {
          $body.removeClass('is-loading');
        }, 100);
      });*/


    // Menu.
      var $menu = $('#menu');

      $menu._locked = false;

      $menu._lock = function() {

        if ($menu._locked)
          return false;

        $menu._locked = true;

        window.setTimeout(function() {
          $menu._locked = false;
        }, 350);

        return true;

      };

      $menu._show = function() {

        if ($menu._lock())
          $body.addClass('is-menu-visible');

      };

      $menu._hide = function() {

        if ($menu._lock())
          $body.removeClass('is-menu-visible');

      };

      $menu._toggle = function() {

        if ($menu._lock())
          $body.toggleClass('is-menu-visible');

      };

      $menu
        .appendTo($body)
        .on('click', function(event) {

          event.stopPropagation();

          // Hide.
            $menu._hide();

        })
        .find('.inner')
          .on('click', '.close', function(event) {

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            // Hide.
              $menu._hide();

          })
          .on('click', function(event) {
            event.stopPropagation();
          })
          .on('click', 'a', function(event) {

            var href = $(this).attr('href');

            event.preventDefault();
            event.stopPropagation();

            // Hide.
              $menu._hide();

            // Redirect.
              window.setTimeout(function() {
                window.location.href = href;
              }, 350);

          });

      $body
        .on('click', 'a[href="#menu"]', function(event) {

          event.stopPropagation();
          event.preventDefault();

          // Toggle.
            $menu._toggle();

        })
        .on('keydown', function(event) {

          // Hide on escape.
            if (event.keyCode == 27)
              $menu._hide();

        });
});


/*preloader*/

jQuery(document).ready(function($) {  
  $(window).load(function(){
    var $body = $('body');
    $('#preloader').fadeOut('slow',function(){
      $(this).remove();
    });
    $('.body-content').fadeIn(2500);
  });
});
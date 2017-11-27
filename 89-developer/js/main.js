// 

(function($,sr) {
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
    var timeout;
    return function debounced () {
      var obj = this, args = arguments;
      function delayed () {
        if (!execAsap)
                          func.apply(obj, args);
        timeout = null;
      }
      ;
      if (timeout)
                    clearTimeout(timeout); else if (execAsap)
                    func.apply(obj, args);
      timeout = setTimeout(delayed, threshold || 100);
    }
    ;
  }
  // smartresize 
  jQuery.fn[sr] = function(fn) {
    return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
  }
  ;
}
)(jQuery,'smartresize');

$(function() {

    // Fix the Home Height

    var setHomeBannerHeight = function(){
	   var homeHeight= $(window).height();
	   $('#overlay-1').height(homeHeight);
    }
    setHomeBannerHeight();

    // Arrow drop effect

    var $scrollDownArrow = $('.bottom > a');

    // Smooth Scrolling and remove Hash tag from link

    $('a[href*=#]:not([href=#])').click(function() {
       
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000, function(){
                  
                });
                return false;
            }
        }
    });


  ///////////////////////////////
  // Center Home Slideshow Text
  ///////////////////////////////
  function centerHomeBannerText() {
    var bannerText = jQuery('#header .middle');
    var bannerTextTop = (jQuery('#header').actual('height')/2) - (jQuery('#header .middle').actual('height')/2) - 20;
    bannerText.css('padding-top', bannerTextTop+'px');
    bannerText.show();
  }
  centerHomeBannerText();



    jQuery(window).smartresize(function() {
        setHomeBannerHeight();
        centerHomeBannerText();
    });
    
});


$( function() {
  // init Isotope
  var $container = $('.isotope').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows',
    getSortData: {
      name: '.name',
      symbol: '.symbol',
      number: '.number parseInt',
      category: '[data-category]',
      weight: function( itemElem ) {
        var weight = $( itemElem ).find('.weight').text();
        return parseFloat( weight.replace( /[\(\)]/g, '') );
      }
    }
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };

  // bind filter button click
  $('#filters').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $container.isotope({ filter: filterValue });
  });

  // bind sort button click
  $('#sorts').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    $container.isotope({ sortBy: sortByValue });
  });
  
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

  
});

function countUpTo(count,selector,max)
    {
      console.log("count--> "+count);
        var div_by = count,
            speed = Math.round(count / div_by),
            $display = selector,
            run_count = 1,
            int_speed = 24;

        var int = setInterval(function() {
            if(run_count < div_by){
                $display.text(speed * run_count);
                run_count++;
            } else if(parseInt($display.text()) < count) {
                var curr_count = parseInt($display.text()) + 1;
                var text = "";
                if(max>99){
                     if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                    /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }else if(max<100 && max>9){
                     if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                   /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }else{
                      if(curr_count<10){
                        text = text+"00"+curr_count;
                    }
                   /*else if(curr_count < 100 && curr_count >9){
                        text = text+"0"+curr_count;
                    }*/
                    else{
                      text = curr_count;
                    }
                }
               
                $display.text(text);
            } else {
                clearInterval(int);
            }
        }, int_speed);
    }


var firstTime = true;
$(document).scroll(function(event) {



  var result = $('.count-timer').isOnScreen();

  if(result == true) {
      console.log("on screen");

      if(firstTime){
        firstTime = false;
            
          var count1 = $('.count1'),
            count2 = $('.count2'),
            count3 = $('.count3'),
            count4 = $('.count4'),
            count5 = $('.count5'),
            count6 = $('.count6')
            count1Num = count1.text(),
            count2Num = count2.text(),
            count3Num = count3.text(),
            count4Num = count4.text(),
            count5Num = count5.text(),
            count6Num = count6.text();

            var max = Math.max(parseInt(count1Num),parseInt(count2Num));
            max = Math.max(max,parseInt(count6Num));
            console.log(max);

            countUpTo(count1Num,count1,max);
            countUpTo(count2Num,count2,max);
            countUpTo(count3Num,count3,max);
            countUpTo(count4Num,count4,max);
            countUpTo(count5Num,count5,max);
            countUpTo(count6Num,count6,max);
      }

    }
});
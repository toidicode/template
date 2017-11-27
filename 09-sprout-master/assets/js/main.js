console.log('%c Proudly Crafted with ZiOn.', 'background: #222; color: #bada55');



(function($) {
  $.fn.countdown = function(options, callback) {
    //custom 'this' selector
    thisEl = $(this); 
  
    // array of custom settings
    var settings = { 
      'date': null,
      'format': null
    };

    // append the settings array to options
    if(options) {
      $.extend(settings, options);
    }
   
    //create the countdown processing function
    function countdown_proc() {
    var eventDate = Date.parse(settings.date) / 1000;
    var currentDate = Math.floor($.now() / 1000);
    
    if(eventDate <= currentDate) {
    callback.call(this);
    clearInterval(interval);
    }
      
    var seconds = eventDate - currentDate;
    
    var days = Math.floor(seconds / (60 * 60 * 24)); 
    //calculate the number of days
    
    seconds -= days * 60 * 60 * 24; 
    //update the seconds variable with number of days removed
    
    var hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * 60 * 60; 
    //update the seconds variable with number of hours removed
    
    var minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    //logic for the two_digits ON setting
    if(settings.format == "on") {
        days = (String(days).length >= 2) ? days : "0" + days;
        hours = (String(hours).length >= 2) ? hours : "0" + hours;
        minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
        seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
    }
    
    //update the countdown's html values.
    thisEl.find(".days").text(days);
    thisEl.find(".hours").text(hours);
    thisEl.find(".minutes").text(minutes);
    thisEl.find(".seconds").text(seconds);
  }

    //run the function
    countdown_proc();

    //loop the function
    interval = setInterval(countdown_proc, 1000);
  };

}) (jQuery);



//Provide the plugin settings
$("#countdown").countdown({
    //The countdown end date
    date: "1 January 2018 12:00:00",
    
    // on (03:07:52) | off (3:7:52) - two_digits set to ON maintains layout consistency
    format: "on"
}, 

function() {
// This will run when the countdown ends
 alert("We're Out Now");
});
     
       

function setHeights() {
    var windowHeight = $(window).height();
    $('.slide').height(windowHeight);
}

setHeights();

$(window).resize(function() {
  setHeights();
});

function addSticky() {
  $('.slide').each(function() {
    var scrollerAnchor = $(this).offset().top;
    if (window.scrollY >= scrollerAnchor) {
      $(this).addClass('fix-it');
    } else {
      $(this).removeClass('fix-it');
    }
  });
}

$(window).scroll(function() {
  addSticky();
});


(function(){

  if(document.getElementById('slideshow')==null) return;

  // we set the 'fx' class on the first image when the page loads
  document.getElementById('slideshow').getElementsByTagName('img')[0].className = "fx";
  
  // this calls the kenBurns function every 4 seconds
  // you can increase or decrease this value to get different effects
  window.setInterval(kenBurns, 8000);   
  
  // the third variable is to keep track of where we are in the loop
  // if it is set to 1 (instead of 0) it is because the first image is styled when the page loads
  var images          = document.getElementById('slideshow').getElementsByTagName('img'),
      numberOfImages  = images.length,
      i               = 1;

  function kenBurns() {
  if(i==numberOfImages){ i = 0;}
  images[i].className = "fx";

  // we can't remove the class from the previous element or we'd get a bouncing effect so we clean up the one before last
  // (there must be a smarter way to do this though)
  if(i===0){ images[numberOfImages-2].className = "";}
  if(i===1){ images[numberOfImages-1].className = "";}
  if(i>1){ images[i-2].className = "";}
  i++;

  }
  
})();


$("#header_slide").owlCarousel({
    items: 1,
    loop:true,
    autoplay: true,
    autoplaySpeed: 1500
});


$('#subscription-form').submit(function(e) {

    e.preventDefault();
    var $form           = $('#subscription-form');
    var submit          = $('#subscribe-button');
    var ajaxResponse    = $('#subscription-response');
    var email           = $('#subscriber-email').val();

    $.ajax({
        type: 'POST',
        url: '././php/subscribe.php',
        dataType: 'json',
        data: {
            email: email
        },
        cache: false,
        beforeSend: function(result) {
            submit.val("Joining...");
        },
        success: function(result) {
            if(result.sendstatus == 1) {
                ajaxResponse.html(result.message);
                $form.fadeOut(500);
            } else {
                ajaxResponse.html(result.message);
                submit.val("Join");
            }
        }
    });

});
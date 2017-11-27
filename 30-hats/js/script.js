$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('#navchange');
   var offset = startchange.offset();
    
    if (startchange.length){
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > offset.top) {
          $(".navbar").css('background-color', 'rgba(0,0,0,.95)');
          $(".navbar .nav a").css('color', 'white');
          $(".navbar-fixed-top .nav").css('padding', '10px 10px 10px 10px');
          $(".navbar-fixed-top .navbar-brand").css('padding', '7px 10px 65px 10px');
          $(".logo-img").attr("src","img/mustache-and-top-hat-inverse.png");
       } else {
          $('.navbar').css('background-color', 'transparent');
          $(".navbar .nav a").css('color', '#121d1f');
          $(".navbar-fixed-top .nav").css('padding', '20px 10px 20px 10px');
           
           if($( "#burgerbutton" ).is( ":hidden" )) {
               $(".navbar-fixed-top .navbar-brand").css('padding', '15px 10px 10px 10px');
           }
          
          $(".logo-img").attr("src","img/mustache-and-top-hat.png");
       }
   });
    }
    
    $('#navbar').on('show.bs.collapse', function () {
        $(".navbar").css('background-color', 'rgba(0,0,0,.95)');
        $(".navbar .nav a").css('color', 'white');
        $(".logo-img").attr("src","img/mustache-and-top-hat-inverse.png");
    });
    
    $('#navbar li a').click(function() {
        console.log("called it");
        $('#navbar').collapse('hide');
    });
    
    $('a.scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });
    
    $('li > a').click(function() {
        $('li').removeClass();
        $(this).parent().addClass('active');
    });
    
    $('.carousel').carousel({
      interval: 6000
    });
    
    
    $("[name='q2checkbox1']").bootstrapSwitch();
    $("[name='q3checkbox1']").bootstrapSwitch();
    $("[name='q4checkbox1']").bootstrapSwitch();
    $("[name='q5checkbox1']").bootstrapSwitch();
    $("[name='q6checkbox1']").bootstrapSwitch();
    $("[name='q7checkbox1']").bootstrapSwitch();
    $("[name='q8checkbox1']").bootstrapSwitch();

    var total = 0;
    
    function reCalcTotal() {
        total = 0;
        var val = 0;
        var mssge = "------------------------------------------- \n";
        
        val = $("#pagecount").val();
        total = Math.floor(((parseInt(val) * 50) )); //+ 50/(val>0?val:1)
        mssge += val + " pages \n";
        
        //login
        if($("[name='q2checkbox1']").bootstrapSwitch('state')) {
            console.log("add q2checkbox1");
            total+=1000;
            mssge += "Has login \n";
        }
        
        //profiles
        if($("[name='q3checkbox1']").bootstrapSwitch('state')) {
            console.log("add q3checkbox1");
            total+=1500;
            mssge += "Has user profiles \n";
        }
    
        //payments
        if($("[name='q4checkbox1']").bootstrapSwitch('state')) {
            console.log("add q4checkbox1");
            total+=1750;
            mssge += "Handles payments \n";
        }
        
        //interaction
        if($("[name='q5checkbox1']").bootstrapSwitch('state')) {
            console.log("add q5checkbox1");
            total+=2000;
            mssge += "Interaction with other websites \n";
        }
        
        //search
        if($("[name='q6checkbox1']").bootstrapSwitch('state')) {
            console.log("add q6checkbox1");
            total+=1500;
            mssge += "Has search \n";
        }
        
        //cms
        if($("[name='q7checkbox1']").bootstrapSwitch('state')) {
            console.log("add q7checkbox1");
            total+=2250;
            mssge += "Has CMS \n";
        }
        
        mssge += total + "$ Total estimate \n";
        mssge += "-------------------------------------------";
        
        if($("[name='q8checkbox1']").bootstrapSwitch('state')) {
            $('#message').val(mssge);
        } else {
            $('#message').val("");
        }
        
        $('input[name="totalfield"]').val(total+"$");
        console.log("mssge " + mssge);
    }
    
    $('#pagecount').bind('keyup mouseup', reCalcTotal);
        
    $('input[name="q2checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q3checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q4checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q5checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q6checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q7checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    $('input[name="q8checkbox1"]').on('switchChange.bootstrapSwitch', reCalcTotal);
    
});
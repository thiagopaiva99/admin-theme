$(function() {

  $('html, body').on('click', function(element) {

    if ( element.target == document.documentElement ){
      $('html').removeClass('open-sidebar');
    }

  });

  $('.js-open-sidebar').on('click', function(){
    $('html').addClass('open-sidebar');
  });

});

// zeynepjs initialization for demo
$(function() {

  var zeynep = $('.zeynep').zeynep({
    opened: function () {
      console.log('the side menu is opened')
    }
  });

  // dynamically bind 'closing' event
  zeynep.on('closing', function () {
    console.log('this event is dynamically binded')
  });

  // handle zeynepjs overlay click
  $('.zeynep-overlay').on('click', function () {
    zeynep.close()
  });

  // open zeynepjs side menu
  $('.side-menu-btn').on('click', function () {
    zeynep.open()
  });
});

$(window).scroll(function(){
    let scroll_pos = document.documentElement.scrollTop;
    if(scroll_pos > 100)
      // fix navbar to the top.
      $('nav').addClass('active');
    else
      $('nav').removeClass('active');
});

$(function() {
  $('#login').hide();
  // $('#lg a').css('background-color', 'transparent');

  $('#su a').css({'background-color': '#307c68', 'color': 'white'});
  // $("#su a").mouseover(function(){
  //   $("#su a").css("background-color", "#155544");
  // });
  // $("#su a").mouseout(function(){
  //       $("#su a").css('background-color', '#307c68');
  //   });

  // $("lg a").mouseover(function(){
  //   $("#lg a").css("background-color", "#155544");
  // });
  // $("#lg a").mouseout(function(){
  //       $("#lg a").css('background-color', '#307c68');
  //   });

  $('.active a').on('click', function(e) {
    e.preventDefault();
    $('#signup-tab').show();
    $('#su a').css({'background-color': '#307c68', 'color': 'white'});
    $('#lg a').css({'background-color':'rgba(160, 179, 176, 0.25)', 'color': '#a0b3b0'});

    $('#login').hide();
  });

  $('.inactive a').on('click', function(e) {
    e.preventDefault();
    $('#su a').css({'background-color': 'rgba(160, 179, 176, 0.25)', 'color': '#a0b3b0'});
    $('#signup-tab').hide();
    $('#login').show();
    // $('#lg a').css('background-color', '#307c68');
    $('#lg a').css({'background-color': '#307c68', 'color': 'white'});

  });

});
      // $('#lg a').css({'background-color': 'rgba(160, 179, 176, 0.25)', 'color': 'white'});

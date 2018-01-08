$(function() {
  $('#login').hide();
  $('#su a').css('background-color', '#24896d');

  $('.active a').on('click', function(e) {
    e.preventDefault();
    $('#signup-tab').show();
    $('#su a').css('background-color', '#24896d');
    $('#login').hide();
  });

  $('.inactive a').on('click', function(e) {
    e.preventDefault();
    $('#su a').css('background-color', 'rgba(160, 179, 176, 0.25)');
    $('#signup-tab').hide();
    $('#login').show();
  });

});

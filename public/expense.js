$(function() {
    $('#edit').hide();
  });

$(function() {
    $('.active a').on('click', function(e) {
  event.preventDefault();
    $('#add').show();
    $('#edit').hide();
  });
});

 $(function() {
    $('.inactive a').on('click', function(e) {
      event.preventDefault();
      $('#add').hide().removeClass('.active');
      $('#edit').show().addClass('.active');
    });
 });
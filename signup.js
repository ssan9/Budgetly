$(function() {

  $('.container').find('input').on('keyup blur focus', function (e) {

    var $this = $(this),
    label = $this.prev('label');

    if (e.type === 'keyup') {

      if ($this.val() === '') {
        label.removeClass('active highlight');
      } 

      else {
        label.addClass('active highlight');
      }
    }

    else if (e.type === 'blur') {

      if( $this.val() === '' ) {
        label.removeClass('active highlight'); 
      } 

      else {
        label.removeClass('highlight');   
      }  

    } 

    else if (e.type === 'focus') {

      if( $this.val() === '' ) {
        label.removeClass('highlight'); 
      } 

      else if( $this.val() !== '' ) {
        label.addClass('highlight');
      }
    }

  });

});

$(function() {

  $('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    console.log($(this).parent());
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.content > div').not(target).hide();

    $(target).fadeIn(600);

  });

});
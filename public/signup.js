// $(function() {

//   $('.container').find('input').on('keyup blur focus', function (e) {

//     var $this = $(this),
//     label = $this.prev('label');

//     if (e.type === 'keyup') {

//       if ($this.val() === '') {
//         label.removeClass('active highlight');
//       } 

//       else {
//         label.addClass('active highlight');
//       }
//     }

//     else if (e.type === 'blur') {

//       if( $this.val() === '' ) {
//         label.removeClass('active highlight'); 
//       } 

//       else {
//         label.removeClass('highlight');   
//       }  

//     } 

//     else if (e.type === 'focus') {

//       if( $this.val() === '' ) {
//         label.removeClass('highlight'); 
//       } 

//       else if( $this.val() !== '' ) {
//         label.addClass('highlight');
//       }
//     }

//   });

// });

// $(function() {

//   $('.tab a').on('click', function (e) {

//     e.preventDefault();

//     $(this).parent().addClass('active');
//     console.log($(this).parent());
//     $(this).parent().siblings().removeClass('active');

//     target = $(this).attr('href');

//     $('.content > div').not(target).hide();

//     $(target).fadeIn(600);

//     $(this).fadeIn(600);

//   });

// });

// $(function() {

//   $('.active a').on('click', function(e) {
//     e.preventDefault();
//     $('#signup').fadeIn();
//     $('#login').fadeOut(function() {
//       $(this).removeClass('active');
//     });
//   });


//   $('.inactive a').on('click', function(e) {
//     e.preventDefault();
//     $('#signup').fadeOut(function() {
//       $(this).removeClass('active');
//     });
//     $('#login').fadeIn(function() {
//      $(this).addClass('active');
//     });
//   });
// });


 // $(function() {
 //    $('.inactive a').on('click', function(e) {
 //      event.preventDefault();
 //      $('#signup').hide();
 //      $('#login').show();
 //    });
 // });

//  $(function() {

//   $('.active a').on('click', function(e) {
//   event.preventDefault();
//     $('#signup').show();
//     $('#login').hide();
//   });
// // });


//     $('.inactive a').on('click', function(e) {
//       event.preventDefault();
//       $('#signup').hide().removeClass('.active');
//       $('#login').show().addClass('.active');
//     });

//  });
    
  

 // $(function() {
 //  $('.inactive a').on('click', function(e) {
 //    e.preventDefault();
 //    $('#signup').hide();
 //    $('#login').show();
 //  })
 // })

 $(function() {
  $('#login').hide();
  // $('#su a').addClass('active');
  $('#su a').css('background-color', '#24896d');
  console.log($('#login'));
  console.log($('#su'));


  $('.active a').on('click', function(e) {
    e.preventDefault();
    console.log($('li'));
    // alert("active");
    // $('#su').removeClass('inactive').addClass('active');

    $('#signup-tab').show();
      $('#su a').css('background-color', '#24896d');

    console.log($('#signup-tab'));

    $('#login').hide();
  });

  $('.inactive a').on('click', function(e) {
    e.preventDefault();
        // alert("inactive");

    // $('lg').removeClass('inactive').addClass('active');
    // toggleClass('.active');
    $('#su a').css('background-color' , 'rgba(160, 179, 176, 0.25)');
    console.log($('#signup-tab'));
    $('#signup-tab').hide();
    $('#login').show();
  });

  
});  

 
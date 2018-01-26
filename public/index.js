$(function() {
	$("li.login a").click(function(e) {
		e.preventDefault();
		 var url = "/api/users";

		// $(window).attr("location", "/signup.html")
		// window.location.href="/signup.html"
	
    // $.ajax({
    //   type: "POST",
    //   url: url,
    //   data: JSON.stringify(newExpense),
    //   contentType: "application/json; charset=utf-8",

    //   success: function(data) {
    //     window.location.href="/signup.html"
        $("#signup-form")
          .closest("#signup-tab")
          .hide()
         $("#su a") .css("background-color", "rgba(160, 179, 176, 0.25)");
        $("#login").show()
        $("#lg a").css("background-color", "#307c68");
      },
      error: function(errMsg) {
        console.log(errMsg);
      }
    });
  });

})


// $(document).ready( function() {
//     $('a.pager-link').click( function() {
//         var page = $(this).attr('href').split(/\?/)[1];
//         $.ajax({
//             type: 'POST',
//             url: '/path-to-service',
//             data: page,
//             success: function(content) {
//                $('#myTable').html(content);  // replace
//             }
//         });
//         return false; // to stop link
//     });
// });

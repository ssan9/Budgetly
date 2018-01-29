$(function() {
	$(".login a").click(function(e) {
    console.log("hi");
		e.preventDefault();
		 // var url = "/api/users";

		// $(window).attr("location", "/signup.html")
	
    // $.ajax({
    //   type: "GET",
    //   url: url,
    //   data: JSON.stringify(newExpense),
    //   contentType: "application/json; charset=utf-8",

    //   success: function(data) {
        window.location.href="/signup.html";
        $("#signup-form")
          .closest("#signup-tab")
          .hide()
         $("#su a") .css("background-color", "rgba(160, 179, 176, 0.25)");
        $("#login").show()
        $("#lg a").css("background-color", "#307c68");

      // },
    //   error: function(errMsg) {
    //     console.log(errMsg);
    //   }
    // });
    return
  });
});

// function getParameterByName(name, url) {
//     if (!url) url = window.location.href;
//     name = name.replace(/[\[\]]/g, "\\$&");
//     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//         results = regex.exec(url);
//     if (!results) return null;
//     if (!results[2]) return '';
//     return decodeURIComponent(results[2].replace(/\+/g, " "));
// }


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

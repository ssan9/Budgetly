// $(function() {
//   var token = localStorage.getItem("token");
//   if (token) {
//     $("#signup").hide();
//   } else {
//     $("#monthly-budget").hide(); //.addClass("hidden");
//     $("#add-expense").hide(); //.addClass("hidden");
//     $("#expense-history").hide(); //.addClass("hidden");
//     $("#expense").hide(); //.addClass("hidden");
//     $("#logout").hide();
//   }

//   $("#logout").click(function() {
//     localStorage.setItem("token", "");
//     window.location = "/";
//   });
// });


$(function() {
  var token = localStorage.getItem("token");
  if (token) {
    $("#monthly-budget").show(); //.addClass("hidden");
    $("#add-expense").show(); //.addClass("hidden");
    $("#expense-history").show(); //.addClass("hidden");
    $("#expense").show(); //.addClass("hidden");
    $("#logout").show();
    // $("#signup").show();
    $("#signup").hide();

  } else {
    $("#signup").show();

  }

  $("#logout").click(function() {
    localStorage.setItem("token", "");
    window.location = "/";
  });
});
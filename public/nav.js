$(function() {
  var token = localStorage.getItem("token");
  if (token) {
    $("#signup").hide();
  } else {
    $("#monthly-budget").hide(); //.addClass("hidden");
    $("#add-expense").hide(); //.addClass("hidden");
    $("#expense-history").hide(); //.addClass("hidden");
    $("#expense").hide(); //.addClass("hidden");
    $("#logout").hide();
  }

  $("#logout").click(function() {
    localStorage.setItem("token", "");
    window.location = "/";
  });
});

$(function() {
  var token = localStorage.getItem("token");
  if (token) {
    $("#monthly-budget").show(); 
    $("#add-expense").show(); 
    $("#expense-history").show(); 
    $("#expense").show(); 
    $("#logout").show();
    $("#signup").hide();

  } else {
    $("#signup").show();
  }

  $("#logout").click(function() {
    localStorage.setItem("token", "");
    window.location = "/";
  });
});
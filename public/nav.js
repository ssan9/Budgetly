$(function() {
  var token = localStorage.getItem("token");
  if (token) {
    $("#monthly-budget").show(); 
    $("#add-expense").show(); 
    $("#expense-history").show(); 
    $("#expense").show(); 
    $("#logout").show();
    $(".menu-icon").show();
    $("#signup").hide();
  } else {
    $(".menu-icon").hide();
    $("#signup").show();
  }

  $("#logout").click(function() {
    localStorage.setItem("token", "");
    window.location = "/";
  });
});

// $(window).resize(function() {
    //   if($(this).width() >1050) {
    //     $("#signup").show();
    //   }
    // })
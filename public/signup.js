$(function() {
  $("#login").hide();
  // $('#lg a').css('background-color', 'transparent');

  $("#su a").css({ "background-color": "#307c68", color: "white" });
  // $("#su a").mouseover(function(){
  //   $("#su a").css("background-color", "#155544");
  // });
  // $("#su a").mouseout(function(){
  //       $("#su a").css('background-color', '#307c68');
  //   });

  // $("lg a").mouseover(function(){
  //   $("#lg a").css("background-color", "#155544");
  // });
  // $("#lg a").mouseout(function(){
  //       $("#lg a").css('background-color', '#307c68');
  //   });

  $(".active a").on("click", function(e) {
    e.preventDefault();
    $("#signup-tab").show();
    $("#su a").css({ "background-color": "#307c68", color: "white" });
    $("#lg a").css({
      "background-color": "rgba(160, 179, 176, 0.25)",
      color: "#a0b3b0"
    });

    $("#login").hide();
  });

  $(".inactive a").on("click", function(e) {
    e.preventDefault();
    $("#su a").css({
      "background-color": "rgba(160, 179, 176, 0.25)",
      color: "#a0b3b0"
    });
    $("#signup-tab").hide();
    $("#login").show();
    // $('#lg a').css('background-color', '#307c68');
    $("#lg a").css({ "background-color": "#307c68", color: "white" });
  });

  // $('#lg a').css({'background-color': 'rgba(160, 179, 176, 0.25)', 'color': 'white'});
  $("#signup-form").submit(function(e) {
    //taking values from input fields and also setting parameters

    e.preventDefault();
    let newExpense = {
      username: $("#username").val(),
      password: $("#password").val(),
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      income: $("#income").val(),
      budget: $("#budget").val()
    };
    var url = "/api/users";

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(newExpense),
      contentType: "application/json; charset=utf-8",

      success: function(data) {
        window.location.href="/monthly-budget.html"
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

  $("#log-in").submit(function(e) {
    //taking values from input fields and also setting parameters
    e.preventDefault();
    let loginInfo = {
      username: $("#username-login").val(),
      password: $("#password-login").val()
    };
    var url = "/api/auth/login";
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(loginInfo),
      contentType: "application/json; charset=utf-8",

      success: function(data) {
        localStorage.setItem("token", data.authToken);
        window.location = "/expense-history.html";
      },

      error: function(errMsg) {
        console.log(errMsg);
      }
    });
  });
});

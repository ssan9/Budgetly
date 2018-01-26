
$(function() {
var token = localStorage.getItem("token");

  $("#expense-form").submit(function(e) { //taking values from input fields and also setting parameters
    alert("hello");  

    e.preventDefault();
    let newExpense = {
      date: $("#date").val(),
      amount: $("#amount").val(),
      category: $("#category").val(),
      description: $("#description").val()
    }
    var url = "/api/expenses";

    $.ajax({
      type: "POST",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      },
      data: JSON.stringify(newExpense),
      contentType: "application/json; charset=utf-8",

      success: function(data)
      {
        console.log(data);
        window.location="/expense-history.html"
        $( "#expense-data" ).html(data);
      },
      failure: function(errMsg) {
        alert(errMsg);
      }

    });
  })
})


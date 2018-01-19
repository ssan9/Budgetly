$("#expense-form").submit(function(e) { //taking values from input fields and also setting parameters
    alert("hello");  

    e.preventDefault();
    let newExpense = {
      username: $("#income").val(),
      password: $("#budget").val(),
    }
    var url = "/api/expenses";

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(newExpense),
      contentType: "application/json; charset=utf-8",

      success: function(data)
      {
        console.log(data);
        window.location.href="/dashboard.html"
      },
      failure: function(errMsg) {
        alert(errMsg);
      }

    });
  })
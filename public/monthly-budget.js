$("#expense-form").submit(function(e) { //taking values from input fields and also setting parameters
    alert("hello");  

    e.preventDefault();
    let newBudget = {
      income: $("#income").val(),
      budget: $("#budget").val()
    }
    var url = "api/users/budget";
    console.log(newBudget);
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(newBudget),
      contentType: "application/json; charset=utf-8",

      success: function(data)
      {
        console.log(data)
        window.location.href="/dashboard.html"
      },
      error: function(errMsg) {
        alert(errMsg);
      }

    });
  })
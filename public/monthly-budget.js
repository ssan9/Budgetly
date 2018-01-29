var token = localStorage.getItem("token");

$("#expense-form").submit(function(e) {
  //taking values from input fields and also setting parameters

  e.preventDefault();
  let newBudget = {
    income: Number($("#income").val()),
    budget: Number($("#budget").val())
  };
  var url = "api/users/budget";
  $.ajax({
    type: "POST",
    url: url,
    headers: {
      Authorization: "Bearer " + token
    },
    data: JSON.stringify(newBudget),
    contentType: "application/json; charset=utf-8",
    success: function(data) {
      console.log(data);
      //window.location.href = "/dashboard.html";
    },
    error: function(errMsg) {
      console.log(errMsg);
    }
  });
});

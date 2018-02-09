$(function() {
  var url = "/api/expenses/dashboard";
  var token = localStorage.getItem("token");

    $.ajax({
      type: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        showBudget(data);
        bar(data);
        console.log(data);
      },
      error: function(errMsg) {
        console.log(errMsg);
      }
    });
  

  function showBudget(data) {
    console.log(data);
    // const budgetHtml = (function(entry) {
    
       const budgetHtml=`<tr class="budget-income">
            <td class="budget income" id="income">$${data.data.income}</td>
            <td class="budget" id="budget">$${data.data.budget}</td>;
            </tr>`
    $(".monthly-budget").append(budgetHtml);

  }
// })
function bar(data) {
  console.log(data)
  var percentage = (data.budget-data.expenses)/data.budget*100
  console.log(percentage);

  if (percentage >=75) {
    $(".safe").css("border-color", "black");
  }

  else if(percentage >=50) {
    $(".still-safe").css("border-color", "black");
  }

  else if(percentage >=25) {
    $(".near-danger").css("border-color", "black");
  }

  else {
    $(".danger").css({"border-color": "magenta","color": "red"});
}
};              
});
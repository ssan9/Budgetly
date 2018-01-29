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
        showExpenses(data);
        showBudget(data);
        bar(data);
        console.log(data);
      },
      error: function(errMsg) {
        console.log(errMsg);
      }
    });
  
  function showExpenses(data) {
    console.log(data);
    const expenseHtml = `<h1>$${data.data.expenses}</h1>`;
    $(".expenses").html(expenseHtml);
  }

  function showBudget(data) {
    console.log(data);
    // const budgetHtml = (function(entry) {
    
       const budgetHtml=`<tr>
                              <td class="budget income" id="income">Monthly Income</td> 
                              <td id="monthly-income" class="monthly-budget">$${data.data.income}</td>
                            </tr>
                            <tr>
                              <td class="budget" id="budget">Monthly Budget</td>
                              <td id="monthly-budget" class="monthly-budget">$${data.data.budget}</td>
                            </tr>
                            <tr>
                              <td class="budget expenses" id="expenses">Monthly Expenses</td>
                              <td id="monthly expenses">$${data.data.expenses}</td> 
                            </tr>
                            <tr> 
                              <td class="budget savings" id="savings">Savings</td>
                              <td id="monthly savings">$${data.data.savings}</td> 
                            </tr>`;

    $(".monthly-budget").html(budgetHtml);

  }
// })
function bar(data) {
  console.log(data)
  const percentage = (data.budget-data.expenses)/data.budget*100;
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
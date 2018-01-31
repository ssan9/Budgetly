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
    },
    error: function(errMsg) {
      console.log(errMsg);
    }
  });

  function showExpenses(data) {
    const expenseHtml = `<h1>$${data.expenses}</h1>`;
    const percentage = (data.budget - data.expenses) / data.budget * 100;
    if (percentage >= 75) {
      $(".expenses").css("color", "green");
    } else if (percentage >= 50) {
      $(".expenses").css("color", "yellow");
    } else if (percentage >= 25) {
      $(".expenses").css("color", "orange");
    } else {
      $(".expenses").css("color", "red");
    }

    $(".expenses").html(expenseHtml);
  }

  function showBudget(data) {
    const budgetHtml = `<tr>
                              <td class="budget income" id="income">Monthly Income</td>
                              <td id="monthly-income" class="monthly-budget">$${
                                data.income
                              }</td>
                            </tr>
                            <tr>
                              <td class="budget" id="budget">Monthly Budget</td>
                              <td id="monthly-budget" class="monthly-budget">$${
                                data.budget
                              }</td>
                            </tr>
                            <tr>
                              <td class="budget expenses" id="expenses">Monthly Expenses</td>
                              <td id="monthly expenses">$${data.expenses}</td>
                            </tr>
                            <tr>
                              <td class="budget savings" id="savings">Savings</td>
                              <td id="monthly savings">$${data.savings}</td>
                            </tr>`;

    $(".monthly-budget").html(budgetHtml);
  }

  function bar(data) {
    const percentage = (data.budget - data.expenses) / data.budget * 100;

    if (percentage >= 75) {
      $(".safe").css({
        "border-top": "5px solid cyan",
        "border-right": "5px solid #32a1ce",
        "border-bottom": "5px solid cyan",
        "border-left": "5px solid #32a1ce"
      });
    } else if (percentage >= 50) {
      $(".still-safe").css({
        "border-top": "5px solid cyan",
        "border-right": "5px solid #32a1ce",
        "border-bottom": "5px solid cyan",
        "border-left": "5px solid #32a1ce"
      });
    } else if (percentage >= 25) {
      $(".near-danger").css({
        "border-top": "5px solid cyan",
        "border-right": "5px solid #32a1ce",
        "border-bottom": "5px solid cyan",
        "border-left": "5px solid #32a1ce"
      });
    } else {
      $(".danger").css({
        "border-top": "5px solid cyan",
        "border-right": "5px solid #32a1ce",
        "border-bottom": "5px solid cyan",
        "border-left": "5px solid #32a1ce"
      });
    }
  }
});

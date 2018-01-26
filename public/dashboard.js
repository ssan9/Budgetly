$(function() {
  var url = "/api/users/budget";

    $.ajax({
      type: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        showBudget(data);
      }
    });
  

  function showBudget(data) {
    console.log(data)
    const budgetHtml = data.map(function(entry) {
      return `<tr class="budget-details" data-id="${entry.id}">
            <td class="budget income" id="income">$${entry.income}hello</td>
            <td class="budget" id="budget">$${entry.budget}</td>
            </tr>`;
    });

    $(".monthly-budget").html(budgetHtml);

}

});
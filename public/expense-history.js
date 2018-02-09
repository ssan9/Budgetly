$(function() {
  var url = "/api/expenses";
  var token = localStorage.getItem("token");
  getData();
  function getData() {
    $.ajax({
      type: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        showExpenses(data);
      },
      error: function(errMsg) {
        console.log(errMsg);
      }
    });
  }

  $(".month").on("change", function() {
    var selected = $(this).val();
    if (selected) {
      makeAjaxRequest(selected);
    }
  });

  function showExpenses(data) {
    const expenseHtml = data.map(function(entry) {
      var strDate = moment(entry.date)
        .format("MMMM Do, YYYY");
      return `<tr class="expenses-details" data-id="${entry.id}">
			  <td class="date data data-js" data-label="date" aria-label="date" data-value="${entry.date}"> ${strDate}</td>
  			<td class="amount data data-js" data-label="amount" aria-label="amount">$${
          entry.amount
        }</td>
  			<td class="category data data-js" data-label="category" aria-label="category">${
          entry.category
        }</td>
  			<td class="description data data-js" data-label="description" aria-label="description">${
          entry.description
        }</td>
			<td class="edit buttons" data-label="edit" aria-label="edit"><button class="edit">Edit</button></td>
			<td class="delete buttons" data-label="delete" aria-label="delete"><button class="delete">Delete</button></td>

			</tr>`;
    });

    $("#expense-data").html(expenseHtml);

    $("#expense-data").on("click", ".edit", function(e) {
      e.preventDefault();
      var button = $(e.currentTarget);
      var expensesDetails = button.parents(".expenses-details");
      var editRowId = button.parents(".expenses-details").attr("data-id");
      var amount = expensesDetails.find(".amount").text();
      var category = expensesDetails.find(".category").text();
      var description = expensesDetails.find(".description").text();
      var date = expensesDetails.find(".date").attr("data-value");
      var strDate = moment(date).format('YYYY-MM-DD');
    
      $("#date").val(strDate);
      $("#amount").val(amount.slice(1));
      $("#category").val(category);
      $("#description").val(description);
      $(".black-cover").removeClass("hidden");
      $(".modal").attr("data-id", editRowId);
    });

    function closeModal() {
      $(".black-cover").addClass("hidden");
      $(".modal").attr("data-id", "");
      $(".modal")
        .find("#date")
        .val("");
      $(".modal")
        .find("#amount")
        .val("");
      $(".modal")
        .find("#category")
        .val("");
      $(".modal")
        .find("#description")
        .val("");
    }

    $(".modal").on("click", ".cancel", function(e) {
      e.preventDefault();
      closeModal();
    });

    $("#modal-form").submit(function(e) {
      e.preventDefault();
      var expenseId = $(e.currentTarget)
        .parents(".modal")
        .attr("data-id");
      var params = {
        date: $("#date").val(),
        amount: $("#amount").val(),
        category: $("#category").val(),
        description: $("#description").val(),
        id: expenseId
      };

      $.ajax({
        type: "PUT",
        url: url + "/" + expenseId,
        headers: {
          Authorization: "Bearer " + token
        },
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          getData();
          $(".month").val("");
          closeModal();
        },

        error: function(err) {
          console.log(err);
        }
      });
    });
  }

  function makeAjaxRequest(selectedMonth) {
    var strMonth = moment(selectedMonth).format("MMMM");
    var strDateMonth = moment(selectedMonth).format("MM");
    var strDateYear = moment(selectedMonth).format("YYYY");
    $.ajax({
      type: "GET",
      url: url + "/" + strDateMonth + "/" + strDateYear,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        showExpenses(data);
        $("#monthly-record").html(strMonth);
      }
    });
  }

  $("#expense-data").on("click", ".delete", function(e) {
    e.stopPropagation();
    e.preventDefault();
    var expenseId = $(e.currentTarget)
      .parents(".expenses-details")
      .attr("data-id");
    $.ajax({
      type: "DELETE",
      url: url + "/" + expenseId,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        getData();
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});

$(function() {
  var url = "/api/expenses";

  function getData() {
    $.ajax({
      type: "GET",
      url: url,
      headers: {
        Authorization: "Bearer " + token
      },
      success: function(data) {
        showExpenses(data);
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
      var strDate = moment(entry.date).format("MMMM Do, YYYY");
      return `<tr class="expense-details" data-id="${entry.id}">
			<td class="date data data-js" data-html-label="date">${strDate}</td>
			<td class="amount data data-js" data-html-label="amount">$${entry.amount}</td>
			<td class="category data data-js" data-html-label="category">${
        entry.category
      }</td>
			<td class="description data data-js" data-html-label="description">${
        entry.description
      }</td>
			<td class="edit buttons" data-html-label="edit"><button class="edit">Edit</button></td>
			<td class="delete buttons" data-html-label="delete"><button class="delete">Delete</button></td>

			</tr>`;
    });

    $("#expense-data").html(expenseHtml);

    $("#expense-data").on("click", ".edit", function(e) {
      e.preventDefault();
      var button = e.currentTarget;
      var editRowId = $(e.currentTarget)
        .parents(".expense-details")
        .attr("data-id");

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

    $(".modal").on("click", ".save", function(e) {
      e.preventDefault();
      var expenseId = $(e.currentTarget)
        .parents(".modal")
        .attr("data-id");
      var params = {
        strDate: $(".modal")
          .find("#date")
          .val(),
        amount: $(".modal")
          .find("#amount")
          .val(),
        category: $(".modal")
          .find("#category")
          .val(),
        description: $(".modal")
          .find("#description")
          .val(),
        id: expenseId
      };
      console.log(params);

      $.ajax({
        type: "PUT",
        url: url + "/" + expenseId,
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        success: function(data) {
          getData();
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
      success: function(data) {
        showExpenses(data);
        $("#monthly-record").html(strMonth);
      }
    });
  }

  $("#expense-data").on("click", ".delete", function(e) {
    e.preventDefault();
    var expenseId = $(e.currentTarget)
      .parent(".expense-details")
      .attr("data-id");
    $.ajax({
      type: "DELETE",
      url: url + "/" + expenseId,
      success: function(data) {
        getData();
      },
      error: function(err) {
        console.log(err);
      }
    });
  });
});

// onUpdate: function() {
//   var me = this,
//   form=this.get
//   incomeInput=input[name=income],
//   budgetTotal=input[name=budget],
//   expensesTotal=input[name=expenses],
//   savingsCalc=incomeInput-expenseTotal;
//   updates.setData({
//     income: incomeInput,
//     budget: budgetTotal,
//     expenses: expenseInput,
//     savings: savingsCalc
//   })
// }

// Ext.Array.forEach(data.items, function (item) {
//                 rows.push({
//                     item: item.data.item,
//                     amount: item.data.amount
//                 })
//             });
//             state = {
//                 income: incomeInput,
//                 budget: budgetTotal,
//                 expenses: expenseTotal,
//                 savings: incomeInput - expenseTotal
//             };
//             return state;
//         },
//         applyState: Ext.emptyFn,
//         // @private
//         calcTotalExpenses: function () {
//             var me = this,
//                 total = 0.0;
//             Ext.Array.forEach(me.getStore().data.items, function (item) {
//                 total += item.data.amount;
//             });
//             return total;
//         },

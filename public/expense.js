
$(function() {
  //   $('#edit').hide();

  //   $('.active a').on('click', function(e) {
  //     e.preventDefault();
  //     $('#add').show();
  //     $('#edit').hide();
  //   });

  //   $('.inactive a').on('click', function(e) {
  //     e.preventDefault();
  //     $('#add').hide().removeClass('.active a');
  //     $('#edit').show().addClass('.active a');
  //   });


  $("#save").click(function(e) { //taking values from input fields and also setting parameters
    e.preventDefault();
    let newExpense = {
      date: $("#date").val(),
      amount: $(".amount").val(),
      category: $("#category").val(),
      description: $(".description").val()
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
        window.location="/expense-history.html"
        $( "#expense-data" ).html(data);
      },
      failure: function(errMsg) {
        alert(errMsg);
      }

    });
  })
})

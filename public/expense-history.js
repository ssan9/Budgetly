$(function() {
	var url = "/data";

$.ajax
({
  type: "GET",
  url: url,
  success: function(data)
  {
     console.log(data);
     const expenseHtml = data.map(function(entry) {
      var strDate=moment(entry.date).format('MMMM Do, YYYY');
      console.log(strDate);
     	return `<div class="expense-details"><div id="date">${strDate}</div><div id="amount">$${entry.amount}</div><div id="category">${entry.category}</div><div id="description">${entry.description}</div>
      <button id="edit">Edit</button><button id="delete">Delete</button></div>`;
     })
     $("#expense-data").html(expenseHtml);
  }
});



// const month=$(".switch-month").val();
//   filter.month
function makeAjaxRequest(selectedMonth){
  // var strDate=moment(selectedMonth).format('MMMM, YYYY');
  var strDateMonth=moment(selectedMonth).format('MM');
  var strDateYear=moment(selectedMonth).format('YYYY');

  console.log(strDateMonth);
  console.log(strDateYear);

  // const isoDate=moment(strDate).format()
  const isoDate = strDate; //moment.js syntax
  var url = "/data-by-monthyear";
  $.ajax({
    type: "GET",
    // data: { opts: opts },
    url: url + "/" + month + "/" + year,
    success: function(data) {
      console.log(data);
      $("#monthly-record").html(`${strDate}`);
    }
  });
}

$(".month").on("change", function(){
  var selected = $(this).val();
  if(selected) {
    makeAjaxRequest(selected);
  }
 console.log(selected);
});
})



$("#edit").click(function(e) { //taking values from input fields and also setting parameters 
    e.preventDefault();
    console.log('${#edit}');
    let update = {
      date: $("#date").val(),
      amount: $(".amount").val(),
      category: $("#category").val(),
      description: $(".description").val()
    }
    var url = "/data";

    $.ajax({
      type: "PUT",
      url: url,
      data: JSON.stringify(update),
      contentType: "application/json; charset=utf-8",

      success: function(data)
      {
        console.log(data);
        // window.location="/expense-history.html"
        $( "#expense-data" ).html(data);
      },
          failure: function(errMsg) {
        alert(errMsg);
    }

    });
  })


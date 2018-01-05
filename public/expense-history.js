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
  var strDate=moment(selectedMonth).format('MMMM, YYYY');
  var url = "/data";
  $.ajax({
    type: "GET",
    // data: { opts: opts },
    url: url,
    success: function(data) {
      console.log(data);
      $("#monthly-record").html(`<h1>Expenses for ${strDate}</h1>`);
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
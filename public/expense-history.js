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
function makeAjaxRequest(opts){
  var url = "/data";
  $.ajax({
    type: "GET",
    // data: { opts: opts },
    url: url,
    success: function(data) {
      console.log(data);
      const monthHtml = data.map(function(record) {
      return `<div id= "history"><h1>Expenses for ${record.month}</h1></div>`;
      })
      console.log(record.month);
      $("#monthly-record").html(monthHtml);
    }
  });
}

$(".month").on("change", function(){
  var selected = $(this).val();
  makeAjaxRequest(selected);
});

})
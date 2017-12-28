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
     	return `<h2>${entry.date}<span>$${entry.amount}</span><span>${entry.category}</span><span>${entry.description}</span></h2>`;
     })
     $("#expense-data").html(expenseHtml);
  }
});
})
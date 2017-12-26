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
     	return `<h1>${entry.description}</h1>`;
     })
     $("#expense-data").html(expenseHtml);
  }
});
})
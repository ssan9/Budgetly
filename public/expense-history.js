$(function() {
	var url = "/api/expenses";
	getData();
	function getData() {
	$.ajax({
		type: "GET",
		url: url,
		success: function(data)
		{
			showExpenses(data)
		}
	});
}

	$(".month").on("change", function(){
		var selected = $(this).val();
		if(selected) {
			makeAjaxRequest(selected);
		}
	});


	function showExpenses(data){
		const expenseHtml = data.map(function(entry) {
			var strDate=moment(entry.date).format('MMMM Do, YYYY');
			return `<div class="expense-details" data-id="${entry.id}">
			<div class="date">${strDate}</div>
			<div class="amount">$${entry.amount}</div>
			<div class="category">${entry.category}</div>
			<div class="description">${entry.description}</div>
			<button class="edit">Edit</button>
			<button class="delete">Delete</button>
			</div>`;
		})
		$("#expense-data").html(expenseHtml);
	}

	function makeAjaxRequest(selectedMonth){
		var strMonth=moment(selectedMonth).format('MMMM');
		var strDateMonth=moment(selectedMonth).format('MM');
		var strDateYear=moment(selectedMonth).format('YYYY');
		$.ajax({
			type: "GET",
			url: url + "/" + strDateMonth + "/" + strDateYear,
			success: function(data) {
				showExpenses(data)
				$("#monthly-record").html(strMonth);
			}
		});
	}

$("#expense-data").on("click", ".delete", function(e) {
	e.preventDefault();
	var expenseId = $(e.currentTarget).parent('.expense-details').attr('data-id');
	$.ajax({
		type: "DELETE",
		url: url + "/" + expenseId,
		success: function(data) {
			getData();
		}, 
		error: function(err) {
			console.log(err);
		}
	})
})





// $("#edit").click(function(e) { //taking values from input fields and also setting parameters
// 	e.preventDefault();
// 	console.log('${#edit}');
// 	let update = {
// 		date: $("#date").val(),
// 		amount: $(".amount").val(),
// 		category: $("#category").val(),
// 		description: $(".description").val()
// 	}
// 	var url = "/api/expenses/";

// 	$.ajax({
// 		type: "PUT",
// 		url: url,
// 		data: JSON.stringify(update),
// 		contentType: "application/json; charset=utf-8",

// 		success: function(data)
// 		{
// 			console.log(data);
// 			// window.location="/expense-history.html"
// 			$( "#expense-data" ).html(data);
// 		},
// 		failure: function(errMsg) {
// 			alert(errMsg);
// 		}
// 	});
// })
})

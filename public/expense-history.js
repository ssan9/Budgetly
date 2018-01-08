$(function() {
	var url = "/api/expenses";
	$.ajax({
		type: "GET",
		url: url,
		success: function(data)
		{
			showExpenses(data)
		}
	});

	$(".month").on("change", function(){
		var selected = $(this).val();
		if(selected) {
			makeAjaxRequest(selected);
		}
	});


function showExpenses(data){
	const expenseHtml = data.map(function(entry) {
		var strDate=moment(entry.date).format('MMMM Do, YYYY');
		return `<div class="expense-details">
							<div id="date">${strDate}</div>
							<div id="amount">$${entry.amount}</div>
							<div id="category">${entry.category}</div>
							<div id="description">${entry.description}</div>
							<button id="edit">Edit</button>
							<button id="delete">Delete</button>
						</div>`;
	})
	$("#expense-data").html(expenseHtml);
}

	// const month=$(".switch-month").val();
	//   filter.month
	function makeAjaxRequest(selectedMonth){
		var strMonth=moment(selectedMonth).format('MMMM');
		var strDateMonth=moment(selectedMonth).format('MM');
		var strDateYear=moment(selectedMonth).format('YYYY');
		// const isoDate=moment(strDate).format()
		// const isoDate = strDate; //moment.js syntax
		$.ajax({
			type: "GET",
			url: url + "/" + strDateMonth + "/" + strDateYear,
			success: function(data) {
				showExpenses(data)
				$("#monthly-record").html(strMonth);
			}
		});
	}



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
//
// 	$.ajax({
// 		type: "PUT",
// 		url: url,
// 		data: JSON.stringify(update),
// 		contentType: "application/json; charset=utf-8",
//
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

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

	function renderForm(params) {
		const expenseHtml = `<div class="expense-details" params-id="${params.id}">
			<input type="date" name="date" id="date" class="expense-form">
			<input type="amount" name="amount" id="amount" placeholder="Amount" class="expense-form">
			<select name="category" id='category' class="expense-form" required>
                  <option value="0">Category</option>
                  <option value="Gas">Gas</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Restaurants and Bar">Restaurants and Bar</option>
                  <option value="Travel">Travel</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Other">Other</option>
                </select>
			<input type="description" name="description" id="description" placeholder="Description" class="expense-form">
			<button class="save">Save</button>
			<button class="cancel">Cancel</button>
			</div>`;
			$(params).html(expenseHtml);
		}

	

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
		
		$(".edit").click(e => {
	console.log("hello");
			e.preventDefault();
			var button=e.currentTarget;
			var editRow=$(button).parent();
			var params={
				strDate: $(editRow).find(".date").text(),
				amount: $(editRow).find(".amount").text(),
				category: $(editRow).find(".category").text(),
				description: $(editRow).find(".description").text()
			};

			console.log("hi");

			var newForm=renderForm(editRow);

			editRow.html(newForm);

			$(".save").click(e=> {
				e.preventDefault();
				var expenseId = $(e.currentTarget).parent('.expense-details').attr('data-id');

				$.ajax({
					type: "PUT",
					url: url + "/" + expenseId,
					success: function(data) {
						getData();
					},
					error: function(err) {
						console.log(err);
					}
				})
			})
		})
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

	// $(".edit").click(e) => {
	// 		e.preventDefault();
	// 		var button=e.currentTarget;
	// 		var editRow=$(button).parent("expense-details");
	// 		var params={
	// 			strDate: $(editRow).find(".date").text(),
	// 			amount: $(editRow).find(".amount").text(),
	// 			category: $(editRow).find(".category").text(),
	// 			description: $(editRow).find(".description").text()
	// 		};

	// 		// var newForm=renderForm(params);

	// 		// editRow.html(newForm);

	// 		$(".save").click(e)=> {
	// 			e.preventDefault();
	// 			var expenseId = $(e.currentTarget).parent('.expense-details').attr('data-id');

	// 			$.ajax({
	// 				type: "PUT",
	// 				url: url + "/" + expenseId,
	// 				success: function(data) {
	// 					getData();
	// 				},
	// 				error: function(err) {
	// 					console.log(err);
	// 				}
	// 			})
	// 		}
	// 	}


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


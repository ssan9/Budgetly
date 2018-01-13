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
	  					<table>
	    					<tr>
						      <td class="date data data-js" data-html-label="date">${strDate}</td>
						      <td class="amount data data-js" data-html-label="amount">$${entry.amount}</td>
						      <td class="category data data-js" data-html-label="category">${entry.category}</td>
						      <td class="description data data-js" data-html-label="description">${entry.description}</td>
						      <td class="edit buttons" data-html-label="edit"><button class="edit">Edit</button></td>
							  <td class="delete buttons" data-html-label="delete"><button class="delete">Delete</button></td>

							</tr>
	    				</table>	
      				</div>`

							
	})

		$("#expense-data").html(expenseHtml);
		
		
		$(".edit").click(e => {		  		
 			
  			e.preventDefault();		  			
  			var button=e.currentTarget;		  					 			
 			var editRowID=$(button).parent('.expense-details').attr('data-id');
 			$(".black-cover").removeClass("hidden");
 			$(".modal").attr("data-id", editRowID)
 			editRow.html(newForm);
 		})
 
 
 		// $(".save").click(e=> {
 		// 	e.preventDefault();
			// var expenseId = $(e.currentTarget).parent('.modal').attr('data-id');		 
  	// 		var params={		 				
 		// 		strDate: $(".modal").find(".date").text(),		 				
 		// 		amount: $(".modal").find(".amount").text()
 		// 		category: $(".modal").find(".category").text(),	 				
 		// 		description: $(".modal").find(".description").text(),
 		// 		id:expenseId
  	// 		};		  			
  			
  		  
 	 // 		$.ajax({
 		// 		type: "PUT",
 		// 		url: url + "/" + expenseId,
 		// 		success: function(data) {
 		// 			getData();
 		// 		},
 		// 		error: function(err) {
 		// 			console.log(err);
 		// 		}
 		// 	})
 		// })
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




})




'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const expenseSchema = mongoose.Schema({
	date: {type: Date},
	amount: {type: Number},
	category: {type: String}, // what should we use for select element?
	description: {type: String}
});

expenseSchema.methods.serialize = function() {
	return {
		id: this._id,
		date: this.date,
		amount: this.amount,
		category: this.category,
		description: this.description
	};
};

const Expense = mongoose.model('Expense', expenseSchema);

//
// function next() {
// 	const date = new Date;
// 	date.setDate(1);
// 	Budgetly.aggregate({ $match: { date : { $gt : date } } }).group({_id : "$_id",
// 		amount, category, description}).exec(function(err, res) {
// 			if(err) throw err;
// 			console.log(res);
// 			Budgetly.remove(function(err) {
// 				if(err) throw err;
// 				mongoose.disconnect();
// 			});
// 		});
//
// }

module.exports = {Expense};

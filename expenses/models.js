"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const expenseSchema = mongoose.Schema({
  date: { type: Date },
  amount: { type: Number },
  category: { type: String }, // what should we use for select element?
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
});

expenseSchema.methods.serialize = function() {
  return {
    id: this._id,
    date: this.date,
    amount: this.amount,
    category: this.category,
    description: this.description,
    user: this.user
  };
};

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = { Expense };

"use strict";
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { Expense } = require("./models");
const { User } = require("../users/models");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/dashboard", jwtAuth, (req, res) => {
  var today = new Date();
  var user;
  User.findById(req.user.id)
    .then(_user => (user = _user))
    .then(() =>
      Expense.find({
        user: req.user.id,
        date: {
          $gte: new Date(today.getFullYear(), today.getMonth(), 1),
          $lte: new Date(today.getFullYear(), today.getMonth(), 31)
        }
      })
    )
    .then(expenses => {
      // add up all expenses
      var expenseTotal = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      return res.json({
        income: user.income,
        budget: user.budget,
        expenses: expenseTotal,
        savings: user.income - expenseTotal
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/", jwtAuth, (req, res) => {
  Expense.find({ user: req.user.id }) // finds the expenses for that user
    .then(data => {
      res.json(data.map(datum => datum.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

//get all expenses by month and year
router.get("/:month/:year", jwtAuth, (req, res) => {
  Expense.find({
    user: req.user.id,
    date: {
      $gte: new Date(req.params.year, req.params.month - 1, 1),
      $lte: new Date(req.params.year, req.params.month - 1, 31)
    }
  })
    .then(data => {
      res.json(data.map(datum => datum.serialize()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

router.get("/:id", jwtAuth, (req, res) => {
  Expense.findById(req.params.id)
    .then(datum => res.json(datum.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went horribly awry" });
    });
});

router.post("/", jwtAuth, (req, res) => {
  const requiredFields = ["date", "amount", "category", "description"];
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Expense.create({
    user: req.user.id,
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description
  })
    .then(expense => res.status(201).json(expense.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    });
});

router.put("/:id", jwtAuth, (req, res) => {
  console.log(req.params.id);
  console.log(req.body.id);
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    return res.status(400).json({
      error: "Request path id and request body id values must match"
    });
  }

  const updated = {};
  const updateableFields = ["date", "amount", "category", "description"];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Expense.findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedDatum => res.status(204).end())
    .catch(err => res.status(500).json({ message: "Something went wrong" }));
});

router.delete("/:id", jwtAuth, (req, res) => {
  Expense.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: "success" });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "something went terribly wrong" });
    });
});

module.exports = { router };

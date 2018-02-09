"use strict";
const { TEST_DATABASE_URL } = require("../config");
const chai = require("chai");
const chaiHttp = require("chai-http");
const faker = require("faker");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const should = chai.should();

const { Expense } = require("../expenses/models");
const { closeServer, runServer, app } = require("../server");

chai.use(chaiHttp);
const username = "exampleUser";
const password = "examplePass";
const firstName = "Example";
const lastName = "User";
const income = 1000;
const budget = 500;
const token = jwt.sign(
  {
    user: {
      username,
      firstName,
      lastName
    }
  },
  JWT_SECRET,
  {
    algorithm: "HS256",
    subject: username,
    expiresIn: "7d"
  }
);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err));
  });
}

function seedBudgetlyData() {
  console.info("seeding budgetly's data");
  const seedData = [];
  for (let i = 1; i <= 10; i++) {
    seedData.push({
      date: faker.date.past(),
      amount: generateAmount(),
      category: faker.lorem.words(),
      description: faker.lorem.sentences()
    });
  }

  return Expense.insertMany(seedData);
}

function generateAmount() {
  const amounts = ["1500", "1000", "2000", "2500", "1750"];
  return amounts[Math.floor(Math.random() * amounts.length)];
}

describe("budgetly's API resource", function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedBudgetlyData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe("GET endpoint", function() {
    it("should return all existing entries", function() {
      let res;
      return chai
        .request(app)
        .get("/api/expenses")
        .set("authorization", `Bearer ${token}`)
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          res.body.should.have.lengthOf.at.least(1);
          return res.body.length;
        })
        .then(count => {
          res.body.should.have.lengthOf(count);
        });
    });

    it("should return data with right fields", function() {
      let resDatum;
      return chai
        .request(app)
        .get("/api/expenses")
        .set("authorization", `Bearer ${token}`)
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.an("array");
          res.body.should.have.lengthOf.at.least(1);

          res.body.forEach(function(datum) {
            datum.should.be.an("object");
            datum.should.include.keys(
              "date",
              "amount",
              "category",
              "description"
            );
          });

          resDatum = res.body[0];
          return Expense.findById(resDatum.id);
        })
        .then(datum => {
          resDatum.id.should.equal(datum.id);
          var datumDate = new Date(resDatum.date).getTime();
          var datDate = new Date(datum.date).getTime();

          datumDate.should.equal(datDate);
          resDatum.amount.should.equal(datum.amount);
          resDatum.category.should.equal(datum.category);
          resDatum.description.should.equal(datum.description);
        });
    });
  });

  describe("POST endpoint", function() {
    it("should add a new entry", function() {
      const newDatum = {
        date: faker.date.past(),
        amount: generateAmount(),
        category: faker.lorem.words(),
        description: faker.lorem.sentences()
      };

      return chai
        .request(app)
        .post("/api/expenses")
        .set("authorization", `Bearer ${token}`)
        .send(newDatum)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.an("object"),
            res.body.should.include.keys(
              "id",
              "date",
              "amount",
              "category",
              "description"
            );
          var datumDate = new Date(newDatum.date).getTime();
          var datDate = new Date(res.body.date).getTime();
          datumDate.should.equal(datDate);
          res.body.id.should.not.be.null;
          res.body.amount.should.equal(parseInt(newDatum.amount));
          res.body.category.should.equal(newDatum.category);
          res.body.description.should.equal(newDatum.description);
          return Expense.findById(res.body.id);
        })
        .then(function(datum) {
          var datumDate = new Date(newDatum.date).getTime();
          var datDate = new Date(datum.date).getTime();
          datumDate.should.equal(datDate);
          datum.amount.should.equal(parseInt(newDatum.amount));
          datum.category.should.equal(newDatum.category);
          datum.description.should.equal(newDatum.description);
        });
    });
  });

  describe("PUT endpoint", function() {
    it("should update fields you send over", function() {
      const updateEntry = {
        date: "12/25/2017",
        amount: "3000",
        category: "foo foo foo",
        description: "cats cats cats"
      };

      return Expense.findOne()
        .then(datum => {
          updateEntry.id = datum.id;

          return chai
            .request(app)
            .put(`/api/expenses/${datum.id}`)
            .set("authorization", `Bearer ${token}`)
            .send(updateEntry);
        })
        .then(res => {
          res.should.have.status(204);
          return Expense.findById(updateEntry.id);
        })
        .then(datum => {
          var datumDate = new Date(updateEntry.date).getTime();
          var datDate = new Date(datum.date).getTime();
          datumDate.should.equal(datDate);
          datum.amount.should.equal(parseInt(updateEntry.amount));
          datum.category.should.equal(updateEntry.category);
          datum.description.should.equal(updateEntry.description);
        });
    });
  });

  describe("DELETE endpoint", function() {
    it("should delete a datum by id", function() {
      let datum;

      return Expense.findOne()
        .then(_datum => {
          datum = _datum;
          return chai
            .request(app)
            .delete(`/api/expenses/${datum.id}`)
            .set("authorization", `Bearer ${token}`);
        })
        .then(res => {
          res.should.have.status(204);
          return Expense.findById(datum.id);
        })
        .then(_datum => {
          should.not.exist(_datum);
        });
    });
  });
});

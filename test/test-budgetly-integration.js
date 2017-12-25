'use strict';

const chai = require('chai');
const chaiHttp =  require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {Budgetly} = require('../models');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function tearDownDb() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.conection.dropDatabase()
			.then(result => resolve(result))
			.catch(err => reject(err));
	});
}

function seedBudgetlyData() {
	console.info('seeding budgetly\'s data');
	const seedData = [];
	for (let i =1; i <= 10; i++) {
		seedData.push({
			date: faker.date.past(),
			amount: generateAmount();
			category: faker.lorem.words();
			description: faker.lorem.sentences()
		});
	}

	return Budgetly.insertMany(seedData);
}

function generateAmount() {
	const amounts = [
		'1500', '1000', '2000', '2500', '1750'];
	return amounts[Math.floor(Math.random() * amounts.length)];
}

describe('budgetly\'s API resource', function() {

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

	describe('GET endpoint', function() {

		it('should return all existing entries', function() {

			let res;
			return chai.request(app)
			.get('/data')
			.then(_res => {
				res = _res;
				res.should.have.status(200);
				res.body.should.have.length.of.at.least(1);

				return Budgetly.count();
			})
			.then(count => {
				res.body.should.have.length.of(count);
			});
		});

		it('should return data with right fields', function() {

			let resDatum;
			return chai.request(app)
				.get('/data')
				.then(function (res) {

					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.an('array');
					res.body.should.have.length.of.at.least(1);

					res.body.forEach(function (datum) {
						datum.should.be.an('object');
						datum.should.include.keys('id', 'date', 'amount', 'category', 'description');
					});

					resDatum = res.body[0];
					return Budgetly.findById(resDatum.id);
				})
				.then(datum => {
					resDatum.date.should.equal(datum.date);
					resDatum.amount.should.equal(datum.amount);
					resDatum.category.should.equal(datum.category);
					resDatum.description.should.equal(datum.description);
				});
		});
	});

	describe('POST endpoint', function() {

		it('should add a new entry', function() {

			const newDatum = {
				date: faker.date.past(),
				amount: amount,
				category: faker.lorem.words(),
				description: faker.lorem.sentences()
			};

			return chai.request(app)
				.post('/data')
				.send(newDatum)
				.then(function (res) {
					res.should.have.status(201);
					res.should.be.json;
					res.body.should.be.an('object'),
					res.body.should.include.keys(
						'id', 'date', 'amount', 'category', 'description');
					res.body.date.should.equal(newDatum.date);
					res.body.id.should.not.be.null;
					res.body.amount.should.equal(newDatum.amount);
					res.body.category.should.equal(newDatum.category);
					res.body.description.should.equal(newDatum.description);
					return Budgetly.findById(res.body.id);
				})
				.then(function (datum) {
					datum.date.should.equal(newDatum.date);
					datum.amount.should.equal(newDatum.amount);
					datum.category.should.equal(newDatum.category);
					datum.description.should.equal(newDatum.description);
				});
		});
	});

	describe('PUT endpoint', function() {
		it('should update fields you send over', function() {
			const updateEntry = {
				date: '12/25/2017',
				amount: '3000',
				category: 'foo foo foo',
				description: 'cats cats cats'
			};

			return Budgetly
				.findOne()
				.then(datum => {
					updateEntry.id = datum.id;

					return chai.request(app)
						.put(`/data/${datum.id}`)
						.send(updateEntry);
				})
				.then(res => {
					res.should.have.status(204);
					return Budgetly.findById(updateEntry.id);
				})
				.then(datum => {
					datum.date.should.equal(updateEntry.date);
					datum.amount.should.equal(updateEntry.amount);
					datum.category.should.equal(updateEntry.category);
					datum.description.should.equal(updateEntry.description);
				});
		});
	});

	describe('DELETE endpoint', function() {

		it('should delete a datum by id', function() {

			let datum;

			return Budgetly
				.findOne()
				.then(_datum => {
					datum = _datum;
					return chai.request(app).delete(`/data/${datum.id}`);
				})
				.then(res => {
					res.should.have.status(204);
					return Budgetly.findById(datum.id);
				})
				.then(_datum => {
					should.not.exist(_datum);
				});
		});
	});
});
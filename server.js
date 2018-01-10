'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');

const { router: expensesRouter } = require('./expenses/router');

const app = express();


app.use(morgan('common'));
app.use(bodyParser.json());

app.use(express.static('public'))
//get all the expenses no matter the date

app.use('/api/expenses/', expensesRouter);



app.use('*', function (req, res) {
	res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, { useMongoClient: true }, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			  .on('error', err => {
			  	mongoose.disconnect();
			  	reject(err);
			  });
		});
	});
}

function closeServer() {
	return mongoose.disconnect().then(() => {
		return new Promise((resolve, reject) => {
			console.log('Closing server');
			server.close(err => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	});
}

if (require.main === module) {
	runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };
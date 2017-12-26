'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
const {Budgetly} = require('./models');

const app = express();


app.use(morgan('common'));
app.use(bodyParser.json());

app.use(express.static('public'))

app.get('/data', (req, res) => {
	Budgetly
		.find()
		.then(data => {
			res.json(data.map(datum => datum.serialize()));
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'something went terribly wrong' });
		});
});

app.get('/data/:id', (req, res) => {
	Budgetly
		.findById(req.params.id)
		.then(datum => res.json(datum.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'something went horribly awry' });
		});
});

app.post('/data', (req, res) => {
	const requiredFields = ['date', 'amount', 'category', 'description'];
	for (let i = 0; i <requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	Budgetly
		.create({
			date: req.body.date,
			amount: req.body.amount,
			category: req.body.category,
			description: req.body.description
		})
		.then(budgetly => res.status(201).json(budgetly.serialize()))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Something went wrong' });
		});
});



app.put('/data/:id', (req, res) => {
	if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
	  return res.status(400).json({
		error: 'Request path id and request body id values must match'
	});
  }

  const updated = {};
  const updateableFields = ['date', 'amount', 'category', 'description'];
  updateableFields.forEach(field => {
	if (field in req.body) {
		updated[field] = req.body[field];
	}
  });

  Budgetly
	.findByIdAndUpdate(req.params.id, { $set: updated}, { new: true})
	.then(updatedDatum => res.status(204).end())
	.catch(err => res.status(500).json({ message: 'Something went wrong'}));
});

app.delete('/data/:id', (req, res) => {
	Budgetly
		.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).json({ message: 'success' });
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'something went terribly wrong' });
		});
});

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
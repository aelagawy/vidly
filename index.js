const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

require('express-async-errors');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const error = require('./middleware/error');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const winston = require('winston');

require('./logger'); 

winston.info('app started..');

const app = express();

process.on('uncaughtException', (ex) => { // unhandled exceptions (outside express pipe) || only for sync code
    winston.error('', ex);
    process.exit(1);
});

//throw new Error('app ex'); // will be catched

process.on('unhandledRejection', (ex) => { // unhandled rejections (outside express pipe) || for async code
    winston.error('', ex);
    process.exit(1);
    //throw ex; // to treat as sync execption *trick
});

// const p = Promise.reject(new Error('something faild async'));
// p.then(()=> { console.log('!') });

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true })
    .then(() => console.log('connected to db..'))
    .catch((err) => console.log('error connected =>', err.message));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//handling errors
app.use(error);

app.listen(1234);


const express = require('express');
const mongoose = require('mongoose');

const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

app.listen(1234);

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true })
    .then(() => console.log('contected to db..'))
    .catch((err) => console.log('error connected =>', err.message));

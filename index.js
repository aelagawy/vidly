const express = require('express');
const genres = require('./routes/genres');

const app = express();

app.use(express.json());
app.use('/api/genres', genres);
app.listen(1234);
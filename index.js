const express = require('express');
const app = express();

require('./logging'); 
require('./startup/routes')(app);
require('./startup/db');
require('./startup/config');
require('./startup/validation');

const port = process.env.PORT || 1234;
app.listen(port, ()=> require('winston').info(`Listening on port ${port}...`));


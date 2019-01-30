const mongoose = require('mongoose');
const winston = require('winston');

module.exports = async function(){
    await mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true });
    winston.info('connected to db..');
}();
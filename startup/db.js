const mongoose = require('mongoose');
const winston = require('winston');

module.exports = async function(){
    //await mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser : true });
    await mongoose.connect('mongodb://vidlyUser:Pa$$w0rd@ds245170.mlab.com:45170/vidly_nodejs_demo', { useNewUrlParser : true });
    
    winston.info('connected to db..');
}();
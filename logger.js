const winston = require('winston');
const { format } = require('winston');
const { combine, timestamp, printf, prettyPrint } = format;
require('winston-mongodb');

module.exports = function () {
  // const _format = combine(timestamp(), printf(({ level, message, timestamp }) => {
  //   return `${timestamp} [${level}]: ${message} ${meta}`;
  // }));

  //const _format = combine( winston.format.json(), prettyPrint());
  const _format = combine(timestamp(), format.splat(),format.simple());
  _errorLog = new winston.transports.File({ filename: 'error.log', level: 'error', format: _format});
  _combinedLog = new winston.transports.File({ filename: 'combined.log', format: _format });
  _dbLog = new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error' });

  winston
    .add(_errorLog)
    .add(_combinedLog)
    .add(_dbLog);

  winston.exceptions.handle(_errorLog);

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
}();
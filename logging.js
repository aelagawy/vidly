require('express-async-errors');
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
  _consoleLog = new winston.transports.Console({ format: winston.format.simple(), prettyPrint: true, colorize: true });

  winston
    .add(_errorLog)
    .add(_combinedLog)
    .add(_dbLog);

  winston.exceptions.handle(_errorLog);

  if (process.env.NODE_ENV !== 'production') {
    winston.add(_consoleLog);
    winston.exceptions.handle(_consoleLog);
  }

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

  winston.info('app started..');
}();
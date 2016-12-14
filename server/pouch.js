const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');
const logger = require('./utils/loggerProduction');
const moment = require('moment');
/// Pouch server

// Web Socket Server


const db =new PouchDB('data/pouch-messages') ;
db.post({
  title: 'Startup',
  timespamp: moment().format()
}).then(function (response) {
  logger.info("********response***********");
  logger.info(response);
  // handle response
}).catch(function (err) {
  logger.info("*********error**********");
  logger.error(err);
});

function listAllDocs(){

  db.allDocs({
    include_docs: true,
    attachments: true
  }).then(function (result) {
    logger.info("********response***********");
    logger.info(result);
  }).catch(function (err) {
    logger.info("*********error**********");
    logger.error(err);
  });
}
function onRequest(credentials, dbName, callback) {
  if (dbName == 'data/pouch-messages') {
    logger.warn("==================");
    logger.warn(dbName);
    listAllDocs();
    callback(null, db);
  } else {
    logger.error("!!!!!!!!!!!!!!!!!!!");
    callback(new Error('database not allowed'));
  }
}

const server = http.createServer();
const wss = PouchSync.createServer(server, onRequest);
wss.on('error', function(err) {
  logger.error("*******************");
  logger.error(err.stack);
});



module.exports = server;

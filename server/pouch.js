const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');
const logger = require('./utils/loggerProduction');

/// Pouch server

// Web Socket Server


//const messagesdb = ;

function onRequest(credentials, dbName, callback) {
  if (dbName == 'data/pouch-messages') {
    logger.warn("==================");
    logger.warn(dbName);
    callback(null, new PouchDB('data/pouch-messages'));
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

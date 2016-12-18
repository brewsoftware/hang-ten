const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');
const logger = require('./utils/loggerProduction');
const moment = require('moment');
/// Pouch server

// Web Socket Server


const messagesDb = new PouchDB('datapouchmessages') ;

function onRequest(credentials, dbName, callback) {
  if (dbName == 'datapouchmessages') {
    listAllDocs();
    callback(null, messagesDb);
  } else {
    callback(new Error('database not allowed'));
  }
}

const server = http.createServer();
const wss = PouchSync.createServer(server, onRequest);
wss.on('error', function(err) {
  logger.error(err.stack);
});



module.exports = {server,messagesDb};

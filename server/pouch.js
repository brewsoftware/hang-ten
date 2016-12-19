const http = require('http');
const PouchSync = require('pouch-websocket-sync');
const logger = require('./utils/loggerProduction');
const moment = require('moment');
const {MessagesDb, Init} = require('./pouchdb');
// Pouch server

// Web Socket Server

// Local messaging db

function onRequest(credentials, dbName, callback) {
  if (dbName == 'datapouchmessages') {
    callback(null, MessagesDb);
  } else {
    callback(new Error('database not allowed'));
  }
}

const server = http.createServer();
const wss = PouchSync.createServer(server, onRequest);
wss.on('error', function(err) {
  logger.error(err.stack);
});

module.exports = {server,MessagesDb};

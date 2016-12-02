const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');

/// Pouch server

// Web Socket Server


const messagesdb = new PouchDB('data/pouch-messages');

function onRequest(credentials, dbName, callback) {
  if (dbName == 'data/pouch-messages') {
    callback(null, messagesdb);
  } else {
    callback(new Error('database not allowed'));
  }
}

const server = http.createServer();
const wss = PouchSync.createServer(server, onRequest);
wss.on('error', function(err) {
  logger.error(err.stack);
});



module.exports = server;

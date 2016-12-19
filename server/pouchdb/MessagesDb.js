
const PouchDB = require('pouchdb');


const MessagesDb = new PouchDB('datapouchmessages') ;

module.exports = {MessagesDb};

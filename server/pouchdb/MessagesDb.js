
const PouchDB = require('pouchdb');


const MessagesDb;
function Init(){
  MessagesDb = new PouchDB('pouchdb/datapouchmessages') ;
}

module.exports = {MessagesDb, Init};

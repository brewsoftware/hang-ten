
const debug = require('debug')('server:app');
const serverRegistration = require('./server-registration');
const heartBeat = require('./heart-beat');
const Parse = require('parse/node').Parse;
var config = require('config');
module.exports = function () {
  // 'function' needed as we use 'this'
  debug('Server Config');
  // Configure parse server here.
  Parse.serverURL = config.parseServer.url;
  Parse.initialize(config.parseServer.appId, config.parseServer.key);
  const app = this;
  heartBeat();

}

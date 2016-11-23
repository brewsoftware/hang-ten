
const debug = require('debug')('server:app');
const serverRegistration = require('./server-registration');
const heartBeat = require('./heart-beat');
module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;
  app.configure(serverRegistration);

  // Note: Async polling thread being called
  app.configure(heartBeat);
}

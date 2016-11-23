
const debug = require('debug')('server:app');
const serverRegistration = require('./server-registration');

module.exports = function () { // 'function' needed as we use 'this'
  debug('Config');
  const app = this;

  app.configure(serverRegistration);

}

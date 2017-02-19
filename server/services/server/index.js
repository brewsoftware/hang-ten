
const debug = require('debug')('service:message');
const path = require('path');
const NeDB = require('nedb');
const service = require('feathers-nedb');
const config = require('config');

const hooks = require('./hooks');

debug('Required');

module.exports = function () {
  const app = this;
  const fileName = path.join(config.database.path, 'server.db');
  debug(`Config for ${fileName}`);


  const db = new NeDB({
    filename: fileName,
    autoload: true,
  });

  const options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25,
    },
  };

  // Initialize our service with any options it requires
  app.use('/server', service(options));

  // Get our initialize service to that we can bind hooks
  const serverService = app.service('/server');

  // Set up our before hooks
  serverService.before(hooks.before);

  // Set up our after hooks
  serverService.after(hooks.after);

  debug('Config complete');
};

const service = require('feathers-nedb');
const NeDB = require('nedb');
const authentication = require('feathers-authentication');

// Default system user
// Create a default auth DB
//  email: 'admin@feathersjs.com',
//  password: 'admin'
function init(app){
  var authdb = new NeDB({
    filename: './data/auth.db',
    autoload: true
  });

  // users database
  app.use('/users', service({ Model: authdb}));

  // Register a before hook to hash passwords
  app.service('users').before({
    create: authentication.hooks.hashPassword(),
    all: [
      authentication.hooks.verifyToken(),
      authentication.hooks.populateUser(),
      authentication.hooks.restrictToAuthenticated()
    ]
  });
};

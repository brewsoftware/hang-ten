const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const localstorage = require('feathers-localstorage');
const authentication = require('feathers-authentication');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');
var storage = require('localstorage-memory');

const NeDB = require('nedb');
const service = require('feathers-nedb');

// A Feathers app is the same as an Express app
const app = feathers();

// Create a NeDB instance
const db = new NeDB({
  filename: './data/messages.db',
  autoload: true
});


// Parse HTTP JSON bodies
app.use(bodyParser.json());
// Parse URL-encoded params
app.use(bodyParser.urlencoded({ extended: true }));
// Register hooks module
app.configure(hooks());
// Add REST API support
app.configure(rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our authentication plugin
var auth = app.configure(authentication({token: {
    secret: '123456789asdfg'
  } }));

// Register our memory "users" service
app.use('/users', service({ Model: db}));
// Register a nicer error handler than the default Express one
app.use(handler());

// Register a before hook to hash passwords
app.service('users').before({
  create: authentication.hooks.hashPassword(),
  all: [
    authentication.hooks.verifyToken(),
    authentication.hooks.populateUser(),
    authentication.hooks.restrictToAuthenticated()
  ]
});

// Create a test user
//app.service('users').create({
//  email: 'admin@feathersjs.com',
//  password: 'admin'
//});

// Start the server
app.listen(3030);

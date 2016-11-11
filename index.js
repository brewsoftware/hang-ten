
var users  = require('./services/users');

const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const handler = require('feathers-errors/handler');

// service references


const jobs = require('./services/jobs');
const content = require('./services/content');

// A Feathers app is the same as an Express app
const app = feathers();

console.log(JSON.stringify(users));
// initialize users service
users.init(app);
jobs.init(app);
content.init(app);


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
app.configure(authentication({token: {
    secret: '123456789asdfg' // TODO: Move into settings file
  } }));

// Register a nicer error handler than the default Express one
app.use(handler());

// Start the server
app.listen(3030); // TODO: Move into settings file

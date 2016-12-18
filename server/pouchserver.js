const {server} = require('./pouch');
const logger = require('./utils/loggerProduction');
const tasks = require('./tasks');
console.log(server);
var debug = require('debug')('./pouch')
// Configure pouch server according to the above
const pouch = server.listen(3031, function() {
  logger.info((new Date()) + ' Pouch Server is listening on', 3031);
});

//tasks();

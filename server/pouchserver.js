const {server} = require('./pouch');
const logger = require('./utils/loggerProduction');
const tasks = require('./tasks');

 function LaunchPouchServer(port){

  var debug = require('debug')('./pouch')
  // Configure pouch server according to the above
  const pouch = server.listen(port , function() {
    logger.info((new Date()) + ' Pouch Server is listening on', port );
  });

  tasks();
}

module.exports = {LaunchPouchServer};

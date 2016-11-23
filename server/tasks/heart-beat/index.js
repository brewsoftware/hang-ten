// global var for holding job references for later cancelling
const schedule = require('node-schedule');
const moment = require('moment');

var job;
module.exports = function(){

  const app = this;
  const logger = require('../../utils/loggerProduction');
  var messages = app.service('messages');

  job = schedule.scheduleJob('15 * * * * *', function(){
    // pump a message over to the messages API that we can pick up on the client.
    logger.info('Heart Beat');

    let message = 'Heart Beat: ' + moment().format();
    messages.create({message:message});
  });
}

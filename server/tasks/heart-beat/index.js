// global var for holding job references for later cancelling
const schedule = require('node-schedule');
const moment = require('moment');
const Parse = require('parse/node').Parse;


let heartBeatJob;

module.exports = function () {
  const app = this;
  const logger = require('../../utils/loggerProduction');

  heartBeatJob = schedule.scheduleJob('15 * * * * *', () => {
    // pump a message over to the messages API that we can pick up on the client.
    logger.info('Heart Beat: xxx');

    const Message = Parse.Object.extend('Message');
    const message = new Message();
    message.message = 'This is a heart beat';
    message.time = moment().format();
    message.title = 'Heart Beat';
    message.audianceRole = 'Users';

    message.save(null, {
      success(msg) {
        console.log('Successfully saved message');
      },
      error(msg, err) {
        console.log(err);
      }
    });
  });
  // cleanup success messages after several days
};

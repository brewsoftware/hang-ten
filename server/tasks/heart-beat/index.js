// global var for holding job references for later cancelling
const schedule = require('node-schedule');
const moment = require('moment');
const {MessagesDb} = require('../../pouchdb');

var heartBeatJob;

module.exports = function(){

  const app = this;
  const logger = require('../../utils/loggerProduction');

  heartBeatJob = schedule.scheduleJob('15 * * * * *', function(){
    // pump a message over to the messages API that we can pick up on the client.
    logger.info('Heart Beat: xxx');
    MessagesDb.post(
      {
        text: "Heart Beat" + moment().format(),
        message: "Heart Beat",
        time: moment().format()
      }
    );
  });
  // cleanup success messages after several days
}

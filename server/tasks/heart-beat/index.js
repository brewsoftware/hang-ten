// global var for holding job references for later cancelling
const schedule = require('node-schedule');
const moment = require('moment');
const {MessagesDb} = require('../../pouchdb');
const Parse = require('parse/node').Parse;


var heartBeatJob;

module.exports = function(){

  const app = this;
  const logger = require('../../utils/loggerProduction');

  heartBeatJob = schedule.scheduleJob('15 * * * * *', function(){
    // pump a message over to the messages API that we can pick up on the client.
    logger.info('Heart Beat: xxx');

    var Message = Parse.Object.extend("Message");
    var message = new Message();
    message.message  = 'This is a heart beat';
    message.time = moment().format();
    message.title = 'Heart Beat';

    message.save(null, {
      success:function(msg){
        console.log('Successfully saved message');
      },
      error:function(msg, err){
        console.log(err);
      }
    });

  });
  // cleanup success messages after several days
}

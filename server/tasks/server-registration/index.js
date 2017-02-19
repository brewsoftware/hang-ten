const logger = require('../../utils/loggerProduction');

// Ensure that we have fingerprinted outselves.
module.exports = function () {
  const app = this;
  const server = app.service('server');
  server.find({
    query: {
      type: 'fingerprint'
    }
  }).then((findeResult) => {
    if (findeResult.data === undefined || findeResult.data.length === 0) {
      server.create({
        type: 'fingerprint'
      });

      server.find({
        query: {
          type: 'fingerprint'
        }
      }).then((result) => {
        if (result.data.length === 0) {
          server.create({
            type: 'fingerprint'
          });
        } else {
          logger.info(`Server fingerprint: ${result.data[0]._id}`);
        }
      });
    } else {
      logger.info(`Server fingerprint: ${findeResult.data[0]._id}`);
    }
  });
};

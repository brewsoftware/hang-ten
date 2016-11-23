
// Ensure that we have fingerprinted outselves.
module.exports = function() {
    const app = this;
    var messageService = app.service('server');
    const logger = require('../../utils/loggerProduction');
    messageService.find({
        query: {
            type: 'fingerprint'
        }
    }).then((result) => {
        if (result.data.length === 0) {
            messageService.create({
                type: 'fingerprint'
            });
            messageService.find({
                query: {
                    type: 'fingerprint'
                }
            }).then((result) => {
                if (result.data.length === 0) {
                    messageService.create({
                        type: 'fingerprint'
                    });
                } else {
                    logger.info('Server fingerprint: ' + result.data[0]._id);
                }
            });
        } else {
            logger.info('Server fingerprint: ' + result.data[0]._id);
        }
    });
}

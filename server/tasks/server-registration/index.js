
// Ensure that we have fingerprinted outselves.
module.exports = function() {
    const app = this;
    var server = app.service('server');
    const logger = require('../../utils/loggerProduction');
    server.find({
        query: {
            type: 'fingerprint'
        }
    }).then((result) => {
        if (result.data.length === 0) {
            servers.create({
                type: 'fingerprint'
            });
            servers.find({
                query: {
                    type: 'fingerprint'
                }
            }).then((result) => {
                if (result.data.length === 0) {
                    servers.create({
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

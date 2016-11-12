const service = require('feathers-nedb');
const NeDB = require('nedb');
module.exports = {
    init: function(app) {
        // Create a NeDB instance
        const jobsdb = new NeDB({
            filename: './data/jobs.db',
            autoload: true
        });

        // jobs database
        app.use('/jobs', service({
            Model: jobsdb
        }));

    }
};

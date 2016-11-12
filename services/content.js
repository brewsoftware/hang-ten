const feathers = require('feathers');

module.exports = {
    init: function(app) {
        app.use('/content', feathers.static(__dirname + '/../content'));
    }
};

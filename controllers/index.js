'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'kraken-localization' };
        
        res.render('index', model);
        
    });

};

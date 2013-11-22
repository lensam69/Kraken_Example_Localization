'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        var model = { name: 'kraken-localization' };

        var languages = ["en-US", "fr-CA", "es-ES", "tlh-US"];
        res.locals.context = {
            locality: languages[ parseInt(Math.random() * 4) ]
        };

        res.render('index', model);

    });

};

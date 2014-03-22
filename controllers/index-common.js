'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {

        // var languages = ['en-US', 'fr-CA', 'es-ES', 'tlh-US'];

        // this works with NODE_ENV=production
        var languages = [{ language: 'en', country: 'US'},
                         { language: 'fr', country: 'CA'},
                         { language: 'es', country: 'ES'},
                         { language: 'tlh', country: 'US'}];

        // a simple locale determination mechanism
        // 1. fully match both language and country
        // 2. match language part only
        // 3. assume the languages[0] being the default if no match
        // Note that this is only for demo purpose
        // real-world determination mechanism shall be more sophticated
        // TODO: case insensitive matching
        //       BCP47 support

        var selectedLanguage = '';

        // var model = { name: 'kraken-localization',
        //               lang: 'en' };

        var model = { name: 'kraken-localization'};

        for (var i = 0; i < req.acceptedLanguages.length; i ++) {
            var c = req.acceptedLanguages[i].indexOf('-');
            if (c !== -1) {
                // language contain a '-'
                for (var j = 0; j < languages.length; j++) {
                    if (req.acceptedLanguages[i].substring(0, c) ===
                        languages[j].language &&
                        req.acceptedLanguages[i].substring(c + 1) ===
                        languages[j].country) {
                        selectedLanguage = languages[j];
                        model.lang = req.acceptedLanguages[i];
                    }
                }
            }
        }

        if (selectedLanguage === '') {
            for (var k = 0; k < languages.length; k++) {
                if (req.acceptedLanguages[i] ===
                    languages[k].language) {
                    selectedLanguage = languages[k];
                    model.lang = req.acceptedLanguages[i];
                }
            }
        }

        if (selectedLanguage === '') {
            selectedLanguage = languages[0];
            model.lang = languages[0].language.concat('-',
                         languages[0].country);
        }

        res.locals.context = {
            // locality: languages[ parseInt(Math.random() * 4, 10) ]
            locality: selectedLanguage
        };

        res.render('index', model);

    });

};

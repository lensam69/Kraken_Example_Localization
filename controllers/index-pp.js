'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {

        // var languages = ['en-US', 'fr-CA', 'es-ES', 'tlh-US'];

        // this works with NODE_ENV=production
        var languages = [{ language: 'en', country: 'US'},
                         { language: 'fr', country: 'CA'},
                         { language: 'es', country: 'ES'},
                         { language: 'tlh', country: 'US'}];

        // Paypal style locale determination mechanism
        // 1. determine user country preference to direct user
        //    correspondingly.  Assume US as default country if not found
        // 2. match user language only against language part (only) in
        //    supported languages
        // 3. assume the default language of the determined country
        // Note that this is only for demo purpose
        // real-world determination mechanism shall be more sophticated
        // TODO: case insensitive matching
        //       BCP47 support

        var selectedLanguage = '';

        // var model = { name: 'kraken-localization',
        //               lang: 'en' };

        var model = { name: 'kraken-localization'};

        // Note: for demo purpose, use only the first accept-language
        // value to determine country.  In real-world determination
        // shall be done using IP, geo-location, cookie, etc. 

        var selectedCountry = 'US';
        var c = req.acceptedLanguages[0].indexOf('-');
        if (c !== -1) {
            selectedCountry = req.acceptedLanguages[i].substring(c + 1);
        }

        for (var i = 0; i < req.acceptedLanguages.length; i ++) {
            var lang = req.acceptedLanguages[i];
            c = lang.indexOf('-');
            if (c !== -1) {
                lang = lang.substring(0, c);
            }
            for (var j = 0; j < languages.length; j ++) {
                if (languages[j].language === lang &&
                    languages[j].country === selectedCountry) {
                    selectedLanguage = languages[j];
                    model.lang = lang;
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

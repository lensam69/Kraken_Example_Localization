# Kraken_Localization

A sample application to show the localization features of Kraken

## What we'll be doing

Starting with a [plain vanilla](https://github.com/lensam69/Kraken_Example_Localization/commit/281da0b8260fe4d47ef52252cf89e43b87c7bc1c) application, we're going to set up content bundles to greet the customer in different (random) languages!

## Relevant code

### Logic
 `./controllers/index.js` defines the `/` route. It populates a model with a `name` parameter, and calls the **index** template for rendering

### Template
 `./public/templates/index.dust` Is the template that greets the user.

 Within it, we have the following entry:
 ` <h1>{@pre type="content" key="index.greeting"/}</h1> `

 This dust tag, tells the framework that it should be populated from the **index.greeting** key in the **index** bundles,

### Content Bundle

 `./locales/` is where the content bundles are located. Initially we only have one: `/locales/US/en/index.properties`.
 As you can see, content bundles are nothing more than properties files, stored according to locality (In this case, **/US/en/**)

 This content bundle only has one entry:
 `index.greeting=Hello, {name}!`

 Which will be used by the template to greet the user.


## Changing the code!

### Adding more locales
Let's add a few more languages (Spanish, French Canadian and Klingon) so that we can greet the user.  To add a locale,
you need to create the appropriate folders in `./locales/`, by country and language. (Even if fictional). Next, we'll add
the content bundle for each locale. This is nothing more than creating `index.properties` files for each, with the right content:

| Locale | Folder to create | index.properties |
| -------- | ------------------ |------------------ |
| Spanish (es_ES) | /ES/es | index.greeting=Hola, {name}! |
| French Canadian (fr_CA) | /CA/fr | index.greeting=Bonjour, {name}! |
| Klingon (tlh_US) | /US/tlh | index.greeting=nuqneH, {name}! |

[See the changes here](https://github.com/lensam69/Kraken_Example_Localization/commit/26f6a4ccb08c864d6ca803d6d4e20a165e676b91)

### Setting the locality
Finally, we need to let kraken know what language we want to use.
This is done by adding a **context** to the response. This context will include the locality we want to use. We'll make this change inline
on the routing logic `./controllers/index.js` before invoking the template

```javascript
res.locals.context = {
            locality: <locale_to_use>
        };
```        

[See the changes here](https://github.com/lensam69/Kraken_Example_Localization/commit/7cbbbf679c449e39815a1168726fecf98399383e)

### Seeing the changes in action
Restart your application, and visit [http://localhost:8000/](http://localhost:8000/)

Everytime you refresh the page, you will be greeted in a random language!


### Is Klingon a thing?
According to [Wikipedia](http://en.wikipedia.org/wiki/Klingon_language) there are 12 fluent speakers in the world.
Isn't it nice that you can greet them?

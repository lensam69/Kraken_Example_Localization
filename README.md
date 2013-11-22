# Kraken_Localization

A sample application to show the localization features of Kraken

## What we'll be doing

We're going to set up content bundles to greet the customer in different (random) languages!

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

 ### Setting the locality






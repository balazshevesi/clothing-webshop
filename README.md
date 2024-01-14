## TODO

- [ ] Build backend for cart, and intergrate with the frontend
- [ ] Build filter/browse section of the website
- [ ] Build search functionallity? (dunno how, but i'll find out)
- [ ] Find email provider and setup forgot password system
- [ ] Fix wierd shit in admin panel. (probably need it's own state)
- [ ] Streamline input validation and form submission
- [ ] Present account info in a cleaner way, and make it ediatable
- [x] Make state logic even simpler, only increment, decrement, remove and add gets handled automatically?
- [x] Switch add to cart modal to sonner toast
- [x] Build mobile menue n shit
- [x] Log user loggin time

---

- [ ] Fill the db with shit
- [ ] Host that shit: prolly client on AWS amplify, then backend in a docker on AWS lambda
- [ ] Write a nice readme
- [ ] Maybe do end to end typesafety?
- [ ] Maybe some "migrate cart" funcitonallity for users who fill their carts, then later decide to signup?
- [ ] Checkout react qurey maybe?
- [ ] Write some tests? idk

---

- [ ] Write GA loggbok from commit history
- [ ] Chill

## naming conventions used

**mySQL**: snake_case

**API Route Names** (excluding dynamic-route names): kebab-case

**JS/TS Code**: camelCase

**Client-Side Storage**: camelCase

**Interacting with mySQL in JS**: when i run the introspect in drizzle, it automagically converts the mySql tables names into camelCase, but i also rename them to include "Tbl" at the end.

**Types and Schema validations**: PascalCase

I choose these naming conventions to simplyfy and streamline the development process. Ideally the developer should be able to look at a variable, and without the help of his IDE, alredy have an idea of where the variable comes from.

## bigger stuff

- [ ] Setup database and backend
- [ ] Make readme more descriptive
- [ ] Build admin panel
- [ ] Setup stripe
- [ ] Setup breadcrums
- [ ] Add pagination

## smaller stuff

- [ ] Hook up filter config to url path stuff
- [ ] Add zooming to product pages
- [ ] Fill in footer
- [ ] Make nav responsive (just add hamburger menue)
- [ ] Define a type for items
- [ ] Change "category/[category]" to just "/browse" and store filters n shit in url params
- [ ] change popups things to sonner toast that says something like "succesfully added to cart"

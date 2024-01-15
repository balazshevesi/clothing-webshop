## TODO

- [ ] Build filter/browse section of the website
- [x] Fill the db with shit
- [x] Make it so if there is only one color, or one size, don't display options (frontend)
- [ ] Build search functionallity? (dunno how, but i'll find out)
- [ ] Find email provider and setup forgot password system
- [ ] Host that shit: prolly client on AWS amplify, then backend in a docker on AWS lambda in a docker
- [ ] Add warining if not enough is in stock
- [ ] Streamline input validation and form submission

- [ ] Present account info in a cleaner way, and make it ediatable
- [ ] Maybe add favourites idk
- [ ] Add planned sales shit
- [x] Fix wierd shit in admin panel. (probably need it's own state)
- [x] Build backend for cart, and intergrate with the frontend
- [x] Make state logic even simpler, only increment, decrement, remove and add gets handled automatically?
- [x] Switch add to cart modal to sonner toast
- [x] Build mobile menue n shit
- [x] Log user loggin time

---

- [x] Make shopping cart pritter
- [ ] Maybe some "migrate cart" funcitonallity for users who fill their carts, then later decide to signup?
- [x] Checkout react qurey maybe?
- [ ] Write some tests? idk
- [ ] Write a nice readme

---

- [ ] Write GA loggbok from commit history
- [ ] Chill

## naming conventions

**mySQL**: snake_case

**API Route Names** (excluding dynamic-route names): kebab-case

**JS/TS Code**: camelCase

**Client-Side Storage**: camelCase

**Interacting with mySQL in JS**: when i run the introspect in drizzle, it automagically converts the mySql tables names into camelCase, but i also rename them to include "Tbl" at the end.

**Types and Schema validations**: PascalCase

I choose these naming conventions to simplyfy and streamline the development process. Ideally the developer should be able to look at a variable, and without the help of his IDE, alredy have an idea of where the variable comes from.

##

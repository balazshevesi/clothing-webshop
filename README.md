## naming conventions used

**mySQL**: snake_case
**API Route Names** (excluding dynamic-route names): kebab-case
**JS/TS Code**: camelCase
**Interacting with mySQL in JS**: when i run the introspect in drizzle, it automagically converts the mySql tables names into camelCase, but i also rename them to include a "T" at the end in the actuall index.ts file.
**Types and Schema validations**: PascalCase

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

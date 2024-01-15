<h1 align="center">
  Clothing Webshop 🛍️⏳
</h1>
<h3 align="center">
  Fullstack e-handel hemsida
</h3>
<div align="center">
  <a href="https://react.dev/">
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  </a>
  <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
  </a>
  <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
  </a>
  <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  </a>

</div>

# Innehåll

# Problem, problemlösning och lärdomar

Detta projekt vart fullt av lärdomar för mig. Jag stötte på alla sorters problem, allt ifrån att jag låste ut mig själv ifrån min egen databas, till att jag satt i timmar med en ".Dockerfile", som borde hetat "Dockerfile" 😂.

## State management

Detta är faktiskt andra gången jag har försökt att bygga detta. Varför? för fösta gången så blev det kaos pga
min state management lösning inte var genomtänkt.
_Hela_ Kundvagnen var lagrad i sin egen komponent som låg relativt långt in i DOM trädet, så det blev väldigt svårt för andra komponenter (som köp-knappen) att komma åt den.
Jag insåg det rätt snabbt att jag borde ha använt mig av (i alla fall) en context run hela skiten.
Men hela dev-ex:en (och därmed min motivation 😂) hann gå till bajs innan jag faktiskt bytte den till en context.

När jag byggde-om den så viste jag ifrån första början att jag var tvungen att lösa state managment på något genomtänkt men samtidigt simpelt sätt.
Så jag valde att testa Zustand, och det funkar fint tycker jag.

## Behovet av en ORM

Detta är första projektet som jag använde SQL i. När jag började bygga ut backenden så tänkte jag att det skulle gå bra med att skriva rå SQL. Så jag valde att skapa stored proceduers, som jag sedan skulle anropa i koden. Jag insåg snabbt att det var ett _väldigt_ dåligt mönster, för jag var ju tvungen till att använda paramatarized qureies (för att skydda mot SQL-injections) och då blev det ju typ 7 rader kod för en enkel CRUD operation (som dessutom inte ens var type-safe), och koden blev väldigt svårläst.

Då fick jag den genialiska ideén att abstrahera bort de 7 raderna till sin egen funktion. Sen insåg jag hur efterblivet det egentligen var; jag hade skapat en helper funktion för varje stored procedure för att förekla läsbarheten av koden, men i processen så gjorde jag det mycket värre. Relativt enkela CRUD-opeationer hade sina egna helper funktioner som i sin tur kallade på stored procedures, som i sin tur faktiskt urförde CRUD-operationerna i databasen. Man kan ju inte hålla på så om man ska bygga något underhållbart.

Så jag valde att utforska lite om vilka alternativ som fanns. Jag hamnade mellan Prisma ORM och Drizzle ORM. Båda verkade vara kompetenta lösningar. Jag råkade dock radera hela min databas när jag försökte insallera Prisma (jag missupfattade vad "database migration" egentligen syftar på 😂), så frustrationen ledde mig till Drizzle 😂.

Jag tycker faktiskt att Drizzle passade bättre än Prisma. pga att APIn efterliknar vanligt SQL-kod (som jag fösöker bli mer bekant med).

## Stateless backend och signleton design

State i backend är ett helt nytt koncept för mig, före detta projektet så tänke jag aldrig ens på det. API ruttarna i Nextjs är stateless, i mitt fall så är det ett problem eftersom att det betyder att vartenda rutt kommer att göra sin egen ansluting till databasen. Då hade jag min databas på RDS som hade en max-ansluting på 60, och när man har Next i dev-mode så kommer anslutningarna inte att disconnecta på hot-realods, så att de 60 anslutingarna fylldes jävligt snabbt.

Varje individuella rutt har ju sin egen state, så först tänkte jag att jag kanske skulle kunna utnytja det genom att ha någon typ av intern rutt som returnerar databas anslutnings objektet. Men det visade sig komplexa objekt (som databas anslutningar) inte kunnde skickas genom HTTP :(.

Själv tycker jag att Next borde ha någon inbyggd lösning på detta, men samtidigt så kommer de ju alldrig göra det med tankte på att de tror att man borde göra typ allt i server-komponenter.

Lösningen är ju att man har någon typ av "pooling". Prisma har nått magiskt rust-lager som hjälper till med det, men jag valde ju Drizzle 💀. Som tur är så kan man ju också ha pooling på databas-nivå, jag försökte fixa det i min AWS RDS panel, men det ville inte fungera, så jag bestämmde mig för att bygga-om min backend med Bun och Hono.

Motivationen till det var dels också att jag började ogilla file-based-routing mer och mer. Jag tycker att file-based-routing fungerar fint på frontenden, men inte på backenden. Motivatinen till bygga om den var dels också att Nextjs inte har någon riktig middleware lösning för backend rutter, och jag var tvungan att ha typ 10 rader boiler-plate kod i varje "admin/" rutt bara för att checka-av om anropet faktisk komm ifrån en admin.

## Client-side caching på i admin panelen

Första gången jag byggde ut admin panelen så tänkte jag att jag skulle använda server-komponenter, men det visade sig vara ett rätt dumt val. Server-komponenter renderas ju på servern, när webläsaren tar emot de som cachar den de. Det betyder att trots att innehållet kan ha ändrats så kommer webläsaren visa den cachade verisonen och _inte_ be servern efter en ny. I praktiken så betyder det att man kan lägga till en artikel i admin/articles/add, och sedan när man kommer tillbaks till admin/articles så kommer den nya artiklen inte visas. Denna chachingen går inte att stänga av. Dokumnetationen säger (komiskt nog) typ bara "nej".

Pga av att innehållet på admin panelen är väldigt interaktivt så är det nog smartare att bygga ut data fetchingen på clienten. Jag har alldrig använt react query innan, men här passar den faktiskt perfekt.

##

## TODO

- [ ] Remove zustand state from admin panel logic, just rely on react query

- [ ] Build filter/browse section of the website
- [ ] Build search functionallity? (dunno how, but i'll find out)
- [ ] Find email provider and setup forgot password system
- [ ] Add warining if not enough is in stock
- [ ] Streamline input validation and form submission

- [ ] Present account info in a cleaner way, and make it ediatable
- [ ] Maybe add favourites idk
- [ ] Add planned sales shit
- [x] Make it so if there is only one color, or one size, don't display options (frontend)
- [x] Fill the db with shit
- [x] Host that shit: prolly client on AWS amplify, then backend in a docker on AWS lambda in a docker
- [x] Fix wierd shit in admin panel. (probably need it's own state)
- [x] Build backend for cart, and intergrate with the frontend
- [x] Make state logic even simpler, only increment, decrement, remove and add gets handled automatically?
- [x] Switch add to cart modal to sonner toast
- [x] Build mobile menue n shit
- [x] Log user loggin time

---

- [ ] Maybe some "migrate cart" funcitonallity for users who fill their carts, then later decide to signup?
- [ ] Write some tests? idk
- [ ] Write a nice readme
- [x] Make shopping cart pritter
- [x] Checkout react qurey maybe?

---

- [ ] Write GA loggbok from commit history
- [ ] Chill

# naming conventions

**mySQL**: snake_case

**API Route Names** (excluding dynamic-route names): kebab-case

**JS/TS Code**: camelCase

**Client-Side Storage**: camelCase

**Interacting with mySQL in JS**: when i run the introspect in drizzle, it automagically converts the mySql tables names into camelCase, but i also rename them to include "Tbl" at the end.

**Types and Schema validations**: PascalCase

I choose these naming conventions to simplyfy and streamline the development process. Ideally the developer should be able to look at a variable, and without the help of his IDE, alredy have an idea of where the variable comes from.

##

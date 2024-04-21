Here is the translated version of the README:

---

<h1 align="center">
  Clothing Webshop 🛍️
</h1>
<h3 align="center">
  Fullstack E-commerce Website
</h3>

<a href="https://clothing-webshop-one.vercel.app/">
  <img src="./readme-assets/showcase.gif"/>
</a>

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
  <a href="https://vercel.com/">
    <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white">
  </a>
  <a href="https://railway.app/">
    <img src="https://img.shields.io/badge/railway-0B0D0E.svg?style=for-the-badge&logo=railway&logoColor=white">
  </a>
  <a href="https://www.mysql.com/">
    <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white">
  </a>
  <a href="https://www.docker.com/">
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
  </a>
  <a href="https://bun.sh/">
    <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white">
  </a>
  <a href="https://www.postman.com/">
    <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white">
  </a>
  <a href="https://tanstack.com/query/v3/">
    <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  </a>
  <a href="https://ui.shadcn.com/">
    <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">
  </a>
    <a href="https://dbeaver.io/">
    <img src="https://img.shields.io/badge/dbeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white" />
  </a>
  <a href="https://hono.dev/">
    <img src="https://img.shields.io/badge/hono-E36002?style=for-the-badge&logo=hono&logoColor=white" />
  </a>
  <a href="https://orm.drizzle.team/">
    <img src="https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black"/>
  </a>
  <a href="https://jwt.io/">
    <img src="https://img.shields.io/badge/JSON%20Web%20Tokens-000?logo=jsonwebtokens&logoColor=fff&style=for-the-badge"/>
  </a>
  <a href="https://stripe.com/">
    <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white"/>
  </a>
  <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=for-the-badge"/>
  </a>

</div>

---

(Read the [Swedish version 🇸🇪](README.md))

> [!NOTE]
> This repository contains the source code for the project part of my high school project. Now that it is approved, I feel that it has fulfilled its purpose, therefore, I have archived this repo.

# Contents

- [Tech stack and dependencies](#tech-stack-and-dependencies)

- [Database design](#database-design)

- [Hosting and deployment](#hosting-and-deployment)

- [Naming conventions](#naming-conventions)

- [Challenges, solutions, and learnings](#challenges-solutions-and-learnings)

- [High school project](#high-school-project)

- [Gallery](#gallery)

# Tech stack and dependencies

- ## [⚛️ React](https://react.dev/)

  - ### [🔼 Next](https://nextjs.org/)

    As I am building a webshop, good SEO is necessary. Good SEO is not something a standard SPA offers, so I had to either server render or write raw HTML. Server rendering sounds nicer.

    I chose to use nextjs as it is basically the only way to server render React while also using the new server component patterns.

  - ### [🌐 Server components](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks)

    Server components are the obvious way to do server rendering and data fetching. I use them as much as I can.

  - ### State management

    - #### [🐻 Zustand](https://zustand-demo.pmnd.rs/)

      I like the concept of unidirectional data flow and global state that Redux popularized. But I dislike all the setup, boilerplate, and complexity that comes with Redux.

      I chose Zustand because the concept is identical to Redux, but the implementation is much simpler.

    - #### [🔬 Tanstack Query](https://tanstack.com/query/latest)

      I chose to use Tanstack Query in the admin panel to manage both data fetching and caching of data.

    - #### [🔎 Nuqs](https://nuqs.47ng.com/)

      I stumbled upon Nuqs in a GitHub thread when I was looking for information on how to handle URL query params in Nextjs apps, and Nuqs turned out to be the perfect solution. The API is exactly like useState, but the state is automatically synced with URL queries. [The repo deserves more stars](https://github.com/47ng/nuqs).

  - ### Styling

    - #### [🌊 Tailwind](https://tailwindcss.com/)

      In my experience, Tailwind is by far the easiest way to do styling.

    - #### [⭐ Heroicons](https://heroicons.com/)

      Heroicons tend to be my go-to for icons. They may not have the largest selection, but all the icons look good, and they also have outlined versions.

    - #### [🔘 Shadcn/ui](https://ui.shadcn.com/)

      If you're already using React and Tailwind, then Shadcn is an obvious choice.

      What sets Shadcn/ui apart from other component libraries is that you own the components. If you want to change something about them, you can simply open the component and change it yourself.

- ## [🧄 Bun](https://bun.sh/)

  - ### [🔥 Hono](https://hono.dev/)

    I chose Hono because it has an API similar to express, but is compatible with the Bun runtime and generally has better performance.

  - ### [🗄️ Drizzle](https://orm.drizzle.team/)

    I chose drizzle as my ORM because the API is similar to regular SQL.

  - ### [👤 Jose](https://github.com/panva/jose)

    JWT signing and verification for handling authentication.

  - ### [🔒 Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)

    To encrypt the passwords.

- ## [🐬 MySQL](https://www.mysql.com/)

  I chose MySQL as my database partly to learn something new and partly because an e-commerce website is full of relationships, so SQL is perfect.

- ## Other

  - ### [🇹 Typescript](https://www.typescriptlang.org/)

    Most of the time, I don't even use TypeScript correctly 😂, but it's still a huge help to prevent bugs, especially on the backend, where you're not always sure what all functions return.

  - ### [🅿️ Prettier](https://prettier.io/) + [eslint](https://eslint.org/)

    I don't want to spend time and mental energy formatting my code, so I chose to use prettier (although the side effect is that I mash CMD+S after nearly every key press 😂, but I can live with that). I use the Import-sort plugin from trivago and the Tailwind-classname-sort-plugin, they are nice.

    I use Eslint simply with the default settings that Nextjs comes with.

- ### [🤖 Valibot](https://valibot.dev/)

  Inputs need to be validated, otherwise users can send all kinds of crap to the backend, which we don't want to allow.

  The most popular validation library is probably [Zod](https://zod.dev/). The downside with Zod is that the import size is (unnecessarily) large. Valibot can often have an import size that is 10x smaller than Zod. And I prefer Valibot's documentation.

- ### [📬 Postman](https://www.postman.com/)

  I mostly used Postman just to check the form of my JSON, it's very nice to have it on the second screen.

- ### [🐳 Docker](https://www.docker.com/)

  I use docker to simplify hosting my Bun backend.

# Database design

![Database visualization image from Dbeaver](/readme-assets/databasDesign.png)
The image is a visualization of the database created with Dbeaver.

These were my requirements for the database:

- Be able to sell products
- Be able to have different brands and categories
- Be able to sell variations of products, like size and color
- Be able to have discounts on some variations of products, but not others
- Be able to highlight a certain variation of a product
- Be able to have unique images for each variation
- Admins should be able to see what everyone has in their shopping carts, even those who are not registered

I decided to expand the whole "product" thing by considering each variation of a product as an article, and then having ads that contain several articles. The ads thus also need to have some kind of "default" article.

# Hosting and deployment

- ## 💻 Frontend

  I use [🔼 Vercel](https://vercel.com/)

- ## 🌐 Backend

  I run my backend code in a [🐳 Docker](https://www.docker.com/) container with [🚝 Railway](https://railway.app/)

- ## 💾 Database

  Here I use [🚝 Railway](https://railway.app/) again

# Naming conventions

- **Database**: snake_case

- **API Route names**: kebab-case

- **JS/TS Code**: camelCase

- **Client-Side Storage**: camelCase

- **Types and Schema validation**: PascalCase

- **Environment variable**: SCREAMING_SNAKE_CASE

- **Extra**: Database tables should have Tbl as a suffix

I chose these conventions to simplify and streamline the development process while also following best practices. The idea behind them is that I, as a developer, shouldn't have to think about trivial things like naming, and also that I shouldn't have to think, "damn, what's that endpoint called again?".

# Problems, solutions, and learnings

This project was full of learnings for me. I encountered all sorts of problems, from locking myself out of my own database, to [spending hours with a ".Dockerfile", which should have been called "Dockerfile" 😂](https://www.youtube.com/watch?v=D2_r4q2imnQ&ab_channel=GamingSoundFX).

- ## State management

  <details>
  <summary>Read</summary>

  This is actually the second time I tried to build this for the first time because it became chaos due to my state management solution not being well thought out. _The entire_ shopping cart was stored in its own component that was relatively far down in the DOM tree, making it very difficult for other components (like the purchase button) to access it. I realized pretty quickly that I should have used (at least) a context around the whole thing. But the whole dev-ex (and thereby my motivation 😂) went to crap before I actually switched it to a context.

  When I rebuilt it, I knew from the start that I needed to solve state management in a thoughtful yet simple way. So I chose to try [Zustand](https://zustand-demo.pmnd.rs/), and I think it works fine.
  </details>

- ## The need for an ORM

  <details>
  <summary>Read</summary>

  This is the first project I've used SQL in. When I started building out the backend, I thought it would be fine to write raw SQL. So I chose to create stored procedures, which I would then call in

  the code. I quickly realized that was a _very_ bad pattern, because I needed to use parameterized queries (to protect against SQL injections) and then it became like 7 lines of code for a simple CRUD operation (which wasn't even type-safe), and the code became very hard to read.

  Then I got the brilliant idea to abstract away those 7 lines into their own function. Then I realized how stupid that actually was; I had created a helper function for each stored procedure to simplify the readability of the code, but in the process, I made it much worse. Relatively simple CRUD operations had their own helper functions that in turn called on stored procedures, which in turn actually performed the CRUD operations in the database. You can't go on like that if you're going to build something maintainable.

  So I chose to explore a bit about what alternatives were available. I was between [Prisma](https://www.prisma.io/) and [Drizzle](https://orm.drizzle.team/) ORM. Both seemed like competent solutions. However, I accidentally deleted my entire database when I tried to install [Prisma](https://www.prisma.io/) (I misunderstood what "database migration" really means 😂), so frustration led me to [🗄️ Drizzle](https://orm.drizzle.team/) 😂.

  I actually think [Drizzle](https://orm.drizzle.team/) suited me better than [Prisma](https://www.prisma.io/). because the API resembles regular SQL code (which I'm trying to become more familiar with).

  </details>

- ## Stateless backend and singleton(-ish) design

  <details>
  <summary>Read</summary>

  State in the backend is a whole new concept for me, before this project I never even thought about it. The API routes in [Next](https://vercel.com/) are stateless, in my case, it's a problem because it means that every route will make its own connection to the database. Then I had my database on RDS which had a max connection of 60, and when you have [Next](https://vercel.com/) in dev-mode, the connections won't disconnect on hot-reloads, so those 60 connections filled up really fast.

  Each individual route has its own state, so at first I thought maybe I could take advantage of that by having some kind of internal route that returns the database connection object. But it turned out complex objects (like database connections) couldn't be sent through HTTP :(.

  Personally, I think [Next](https://vercel.com/) should have some built-in solution for this, but at the same time, they'll never do that considering they think you should do pretty much everything in server components.

  The solution is to have some kind of "pooling". [Prisma](https://www.prisma.io/) has some magical rust layer that helps with that, but I chose [Drizzle](https://orm.drizzle.team/) 💀. Fortunately, you can also have pooling at the database level, I tried to fix it in my AWS RDS panel, but it wouldn't work, so I decided to rebuild my backend with Bun and Hono.

  Part of the motivation for that was also that I was starting to dislike file-based routing more and more. I think file-based routing works fine on the frontend, but not on the backend. Part of the motivation to rebuild it was also that [Next](https://vercel.com/) doesn't have any real middleware solution for backend routes, and I had to have like 10 lines of boiler-plate code in every "admin/" route just to check if the call actually came from an admin.

  Technically, the connection isn't really a singleton because I'm using "mysql.createPool". I do it because I encountered some kind of timeout bug where the connection would close after a few hours, but it was impossible to detect that (unless you want to wrap every endpoint in a try-catch, which you don't). mysql.createPool handles such things for me.
  </details>

- ## Client-side caching in the admin panel

  <details>
  <summary>Read</summary>

  The first time I built out the admin panel, I thought I would use server components, but that turned out to be a pretty dumb choice. Server components are rendered on the server, when the browser receives them, it caches them. That means that despite the content having changed, the browser will show the cached version and _not_ ask the server for a new one. In practice, this means that you can add an article in admin/articles/add, and then when you come back to admin/articles, the new article won't show. This caching cannot be turned off. The documentation says (comically enough) something like "no".

  Because the content on the admin panel is very interactive, it's probably smarter to build out data fetching on the client instead.

  I've never used react query before, but here it actually fits perfectly.

  ![Image from nextjs documentation](https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fcaching-overview.png&w=3840&q=75&dpl=dpl_48oNJS5BFcpzrgy9nvGYCkyvBDXL)

  </details>

- ## Hosting a bun API

  <details>
  <summary>Read</summary>

  Bun is a relatively new thing and therefore there are no good no-bullshit guides on hosting it. After a bit of googling, I figured out that I had to stuff it into a docker container. [There's some official Dockerfile template on Bun's website](https://bun.sh/guides/ecosystem/docker), but I chose to use one from an article on Medium because it seemed much simpler.

  The next step then was to find a system to host the docker file. AWS has EC2 or Lambda, but the complexity is really high, (I don't really know how it would have worked, but I guess) I would have first needed to do some kind of automation that listens for commits on the GitHub repo, then fetches the docker file and builds a docker image from it, and then hosts it on EC2 or Lambda. That sounds super complicated, I wanted something simpler.

  With [Render](https://render.com/) you can just link the GitHub repo and then _it just works_, and they seemed to support docker, but the cold-starts are brutal (like 1min). Later I found that [Railway](https://railway.app/) could also deploy docker (there the cold-starts are totally okay).
  </details>

- ## State initialization before hydration

  <details>
  <summary>Read</summary>

  The "Login" button is something that is dependent on state. If the user is logged in, it should say "view account", if they are not logged in, it should say "login". The state can be initialized on the client with javascript, but if the user is logged in, it will say "login" before the page hydrates. It looks weird, so I initialized the state with a server component, then the client takes over.

  The solution is not 100% optimal because it causes an extra rerender, but navigation is a very important part of UX, so it's something you have to deal with.

  Railway app has the same problem, but they haven't solved it haha

  </details>

# High school project (gymnasiearbete)

This project is part of my approved high school project at Haganässkolan, Älmhult (Technology program).

The report is available as a [PDF file](/readme-assets/balazs-hevesi-gymnasiearbete-rapport.pdf) in this repo, but it's easiest to open it with [nbviewer](https://nbviewer.org/github/balazshevesi/clothing-webshop/blob/main/readme-assets/balazs-hevesi-gymnasiearbete-rapport.pdf).

## Abstract (copied from the report)

> This thesis presents the process of creating an e-commerce site, exploring and utilizing modern web technologies within both front-end-end and back-end development. The work includes an overview of relevant JavaScript frameworks, database choices between SQL and NoSQL, and a discussion on the technical decisions made throughout the project. The final outcome is a functioning ecommerce-store, with insights and reflections on the challenges and lessons learned from the project.

# Gallery

| ![Shop header](/readme-assets/gallery/pic_shop_header.png) | ![Shop's most popular](/readme-assets/gallery/pic_shop_most_popular.png) |
| :--------------------------------------------------------: | :----------------------------------------------------------------------: |
|                      Shop page header                      |                          Most popular products                           |

| ![Product page](/readme-assets/gallery/pic_shop_product_page.png) | ![Search by brand](/readme-assets/gallery/pic_shop_search_by_brand.png) |
| :---------------------------------------------------------------: | :---------------------------------------------------------------------: |
|                           Product page                            |                             Search by brand                             |

| ![Search filters](/readme-assets/gallery/pic_shop_search_filters.png) | ![Shopping cart](/readme-assets/gallery/pic_shop_cart.png) |
| :-------------------------------------------------------------------: | :--------------------------------------------------------: |
|                            Search filters                             |                       Shopping cart                        |

| ![Checkout](/readme-assets/gallery/pic_shop_checkout.png) | ![Admin - Home](/readme-assets/gallery/pic_admin_home.png) |
| :-------------------------------------------------------: | :--------------------------------------------------------: |
|                         Checkout                          |                        Admin - Home                        |

| ![Admin - Articles](/readme-assets/gallery/pic_admin_articles.png) | ![Admin - Edit articles](/readme-assets/gallery/pic_admin_articles_edit.png) |
| -----------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                                                   Admin - Articles |                            Admin - Edit articles                             |

| ![Admin - Brands](/readme-assets/gallery/pic_admin_brands.png) | ![Admin - Edit brands](/readme-assets/gallery/pic_admin_brands_edit.png) |
| :------------------------------------------------------------: | :----------------------------------------------------------------------: |
|                         Admin - Brands                         |                           Admin - Edit brands                            |

| ![Admin - Categories](/readme-assets/gallery/pic_admin_categories.png) | ![Admin - Edit categories](/readme-assets/gallery/pic_admin_categories_edit.png) |
| :--------------------------------------------------------------------: | :------------------------------------------------------------------------------: |
|                           Admin - Categories                           |                             Admin - Edit categories                              |

| ![Admin - Listings](/readme-assets/gallery/pic_admin_listings.png) | ![Admin - Edit listings](/readme-assets/gallery/pic_admin_listings_edit.png) |
| :----------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                          Admin - Listings                          |                            Admin - Edit listings                             |

| ![Admin - Planned sales](/readme-assets/gallery/pic_admin_planned_sales.png) | ![Admin - Edit planned sales](/readme-assets/gallery/pic_admin_planned_sales_edit.png) |
| :--------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
|                            Admin - Planned sales                             |                               Admin - Edit planned sales                               |

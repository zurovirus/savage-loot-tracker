## Notes
This application is still a work in progress, all images are not the final representation of the application. Thanks!

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Setup

Node v20.9.0 or later installed.

npm v10.2.3 or later installed.

The Node installer comes with npm, you can download the latest version [here.](https://nodejs.org/en/download/)

After cloning the directory, navigate to the folder with your chosen IDE.

In the terminal, do a `npm install` to install all dependencies.
```
npm install
```

Create a .env file in the folder root and add your database to the variable DATABASE_URL as seen below.

![image](https://github.com/zurovirus/savage-loot-tracker/assets/128162169/d79b2f1a-b69c-4328-ac01-e4823976d1c0)

![image](https://github.com/zurovirus/savage-loot-tracker/assets/128162169/2e357607-a827-45ec-83e1-c50082ac468f)

Using the terminal, push the current database schema onto your database with `npm prisma db push`.
```
npx prisma db push
```

Using the terminal, seed the database afterwards with `npm prisma db seed`.
```
npx prisma db seed
````

Using the terminal, run the development server with `npm run dev`.
```
npm run dev
```

Open http://localhost:3000/ in your browser.

Create a group and add players to the group.

You're ready to begin tracking!

## Preview
**Home Page**

![image](https://github.com/zurovirus/savage-loot-tracker/assets/128162169/5a1dc189-658c-421a-bb9a-6ac7cd55fd5c)

**Selecting Loot**

![image](https://github.com/zurovirus/savage-loot-tracker/assets/128162169/83af67d4-0aa5-4ba4-ad81-6ab8bf6e1737)

**Loot History**

![image](https://github.com/zurovirus/savage-loot-tracker/assets/128162169/9f90db06-26ed-42bd-8517-dcb06844bd3c)




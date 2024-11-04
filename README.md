# Using Clerk with Nextjs + Nextjs

Nextjs and Nestjs can be a powerful combo when developing maintableable applications. Setting up `Clerk` can be tricky though because the documentation does not provide an example directly. This is a simple example/template that anyone can use to set up clerk in a Nestjs & Nextjs full stack application.

# Installation

clone this repo

```
git clone https://github.com/vinceflores/clerk_nest_next_template.git
```

Install the npm packages

```
cd frontend
npm install
```

```
cd backend
npm install
```

Set up
Create the `.env` files using the examples

```
#/fronend
cp .env.local-example .env.local
```

```
#/backend
cp .env-example .env
```

## Set up clerk

Head over to clerk and [ create an app ] (https://clerk.com/).

Copy the api keys for Nextjs and add it to `.env.local` in the `/frontend` folder.

## Set up prisma

Head over to the `backend' folder

```
cd backend
```

This repo uses `Sqllite` as its database. For switching to you prefered sql database follow the [prisma docs](https://www.prisma.io/docs/orm/overview/databases/postgresql).

Configure the schema.prisma file if needed.

### Initialize the Database

To initialize the database migration run

```
npx prisma@latest migrate dev --name init
```

Then generate the prisma client.

```
npx prisma@latest generate
```

#Usage

To run the `Nextjs` client/frontend open a terminal and run

```
cd frontend
npm run dev
```

open `http://localhost:3000`

To run the `Nestjs` server/backend open a terminal and open the backend folder

```
cd backend
npm run start:Dev
```

## Setting up the webhook

To test the webhook, an `ngrok` url is required.

Open a terminal and enter

```
ngrok http 3001
```

This ngrok url maps to `http://localhost:3001`.

Head over to clerk and add the ngrok/webhook url and suffix it with `/webhooks/clerk`. For example `https://.../webhooks/clerk`. Then select the evet types to listen to. For example "user.created", "user.updated", and "user.deleted"

You can test the webhook endpoint from the Clerk Dashboard > Webhooks. To confirm that a user is created and syncs with the database, open a terminal and run

```
npx prisma studio
```

Open the `User` table.

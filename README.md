# Xenon

A simple discord bot dased on Discord.js v14

---

# To Get Up And Running

### 1. Fork the repo

Working from a fork of the repo will allow to make changes to the repo under your own without disturbing anything in the real repo. Make changes like crazy.

[Fork the repo](https://github.com/losier/Xenon/fork)

### 2. Clone the repo locally

### 3. Install Dependencies

```bash
$ npm i
```

### 4. Set up your environment

Get your own Environment variables for the services and APIs used.

Copy `.env.sample` to `.env` and replace the required values

```bash
$ cp .env.sample .env
```

- Add your Discord Bot Token
  Go to `Settings > Bot` under a new application and get the `TOKEN` from the page.

- Add Client ID
  Go to `Settings` under a new application and get the `CLIENT_ID` from the page.

- Add WebHook Data
  This guide shows you how to create a webhook for a specific channel, the bot listens for the welcome messages in the `#welcome` channel and `#suggestions` channel for instance.
  https://discordjs.guide/popular-topics/webhooks.html#creating-webhooks-through-server-settings

  For Example - If your webhook url looks like this -  
  `https://discord.com/api/webhooks/1015632774457204766/smTYeBU3JWkp4TTTODtEcJDCS2oT1GeAEKezEKVZqtksEkeMLBg9aKZ1igmxec7RDsES`,
  the first part is the `WEBHOOK_ID`, and the second is the `WEBHOOK_TOKEN`.

  The current webhooks used are for -

  1. **welcome messages** - `WEBHOOK_ID`, `WEBHOOK_TOKEN`.
  2. **suggestions** - `SUGGESTION_WEBHOOK_ID`,` SUGGESTION_WEBHOOK_TOKEN`

- Mongo Connection URI
  `MONGODB_URI` - The URI for the local [Mongo DB](https://www.mongodb.com/) to connect to.

- Brainshop AI for the chatBot
  `AI_KEY` and `B_ID` from [Brainshop](https://brainshop.ai/)

- News API
  `NEWS_API_KEY` from [NewsAPI](https://newsapi.org/)

### 5. Invite the bot to a local server

Generate an invite URL under `OAuth2 > URL Generator` on the Discord Development portal and invite the bot to your respective server.

### 6. Start the development server

Start a auto refresing dev server -

```bash
$ npm run dev
```

Start the bot -

```bash
$ npm start
```

# Strongly Typed 💪

<!-- BADGES -->

![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/strongly-typed?style=flat-square)

## About

A simple notes application.

## Features (Users)

- ✏️ Markdown support
- ☁️ Cloud storage
- ▶️ Sync across devices
- 🎹 Some IDE inspired key combinations

## Features (Developers)

- ⚡ Full-stack React with Next.js
- ⏱ Postgres Database with Prisma + backups
- 🚀 Fast deploy with docker compose 🐳
- 🧙‍♂️ End to end type-safety with [tRPC](https://trpc.io)
- 🔐 Validate environment variables at build time
- 💡 VS Code Suggested extensions
- 💖 CI/CD with GitHub actions
  - 🧪 End-to-end testing with [Playwright](https://playwright.dev/)
  - 🎨 [ESLint](https://eslint.org) + Prettier 💅
  - 🔍 Static Code Analysis with [SonarCloud](https://sonarcloud.io)

## Setup

**yarn:**

```sh
# Install dependencies
yarn
# starts postgres db + runs migrations + seeds + starts next.js
yarn setup
```

### Requirements

- Node >= 14
- Docker (for running Postgres, Redis, etc.) 🐳

### **NVM**

<a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a>

Node is managed using Node Version Manager

```sh
# Update node version
nvm use <version>
```

## Development

### Database backups handled by:

https://github.com/prodrigestivill/docker-postgres-backup-local

### Commands

```sh
# Copy .env file and fill in values
cp .env.template > .env

# runs `prisma generate` + `prisma migrate` + `next build`
yarn build

## resets local db
yarn db:reset

# starts next.js
yarn dev

# starts postgres db + runs migrations + seeds + starts next.js
yarn setup

# runs e2e tests on dev
yarn test:dev

# runs e2e tests on `next start` - build required before
yarn test:start

# runs normal jest unit tests
yarn test:unit

# runs e2e tests
yarn test:e2e

# Prettier
yarn prettier

# Prettier and auto fix
yarn prettier:fix

# Lint
yarn lint
# Lint and auto fix
yarn lint:fix

# Generate prisma schema
npx prisma

# Format schema.prisma
npx prisma format

# Launch prisma studio
npx prisma studio

# Docker
# If you would like to deploy the containers to a remote host
# Set up a context with the remote hosts details
docker context create home-server --docker "host=ssh://harri@202.172.109.118"

# Start using it
docker context use home-server
```

## Files of note

<table>
  <thead>
    <tr>
      <th>Path</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="./prisma/schema.prisma"><code>./prisma/schema.prisma</code></a></td>
      <td>Prisma schema</td>
    </tr>
    <tr>
      <td><a href="./src/pages/api/trpc/[trpc].ts"><code>./src/pages/api/trpc/[trpc].ts</code></a></td>
      <td>tRPC response handler</td>
    </tr>
    <tr>
      <td><a href="./src/server/routers"><code>./src/server/routers</code></a></td>
       <td>All tRPC-routers</td>
    </tr>
  </tbody>
</table>

---

<!-- LICENSE -->

## **License** ⚖️

Distributed under the MIT License. See `LICENSE` for more information.

<!-- DISCLAIMER -->

## **Disclaimer** 🚨

This software is currently a work in progress and is considered in ALPHA state. Features will appear and disappear, APIs will be changed, bugs will be introduced, your feedback is always welcome! 🚧

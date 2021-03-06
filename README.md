# Strongly Typed ๐ช

<!-- BADGES -->

![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/strongly-typed?style=flat-square)

[![unit-test](https://github.com/HarrisFauntleroy/strongly-typed/actions/workflows/unit.yaml/badge.svg)](https://github.com/HarrisFauntleroy/strongly-typed/actions/workflows/unit.yaml)

[![e2e-test](https://github.com/HarrisFauntleroy/strongly-typed/actions/workflows/e2e.yml/badge.svg)](https://github.com/HarrisFauntleroy/strongly-typed/actions/workflows/e2e.yml)

## About

A simple notes application.

## Features (Users)

- โ๏ธ Markdown support
- โ๏ธ Cloud storage
- โถ๏ธ Sync across devices
- ๐น Some IDE inspired key combinations

## Features (Developers)

- โก Full-stack React with Next.js
- โฑ Postgres Database with Prisma + backups
- ๐ Fast deploy with docker compose ๐ณ
- ๐งโโ๏ธ End to end type-safety with [tRPC](https://trpc.io)
- ๐ Validate environment variables at build time
- ๐ก VS Code Suggested extensions
- ๐ CI/CD with GitHub actions
  - ๐งช End-to-end testing with [Playwright](https://playwright.dev/)
  - ๐จ [ESLint](https://eslint.org) + Prettier ๐
  - ๐ Static Code Analysis with [SonarCloud](https://sonarcloud.io)

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
- Docker (for running Postgres, Redis, etc.) ๐ณ

### **NVM**

<a href="https://github.com/nvm-sh/logos"><img alt="nvm project logo" src="https://raw.githubusercontent.com/nvm-sh/logos/HEAD/nvm-logo-color.svg" height="50" /></a>

Node is managed using Node Version Manager

```sh
# Update node version
nvm use <version>
```

## Development

### Database backups handled by

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

## **License** โ๏ธ

Distributed under the MIT License. See `LICENSE` for more information.

<!-- DISCLAIMER -->

## **Disclaimer** ๐จ

This software is currently a work in progress and is considered in ALPHA state. Features will appear and disappear, APIs will be changed, bugs will be introduced, your feedback is always welcome! ๐ง

# Strictly Typed

## About

A simple notes application.

## Features

- ⚡ Full-stack React with Next.js
- ⚡ Postgres Database with Prisma
- 🐳 Simple deployment with docker compose 🪄
- 🧙‍♂️ End to end type-safety with [tRPC](https://trpc.io)
- 🔐 Runtime .env validation
- ⚙️ VS Code suggested extensions
- 🎨 ESLint + Prettier
- 💖 CI setup using GitHub Actions:
  - ✅ End-to-end testing with [Playwright](https://playwright.dev/)
  - ✅ Linting
  - ✅ Static Code Analysis with SonarCloud

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
      <td>Your app's different tRPC-routers</td>
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

<!-- BADGES -->

[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=coverage&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=alert_status&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=duplicated_lines_density&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=ncloc&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=sqale_index&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=sqale_rating&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=vulnerabilities&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=code_smells&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=reliability_rating&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=HarrisFauntleroy_strictly-typed&metric=bugs&token=f272ae0dd44fc7e617996a880e44ea444385bee4)](https://sonarcloud.io/summary/new_code?id=HarrisFauntleroy_strictly-typed)

![GitHub commit activity](https://img.shields.io/github/commit-activity/w/HarrisFauntleroy/strictly-typed?style=flat-square)

![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/HarrisFauntleroy/strictly-typed?style=flat-square)

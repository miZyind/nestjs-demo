# NestJS Demo

[![Docker](https://img.shields.io/badge/docker-2496ed?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com)
[![NodeJS](https://img.shields.io/badge/->=14-339933?style=for-the-badge&label=&logo=node.js&logoColor=fff)](https://nodejs.org)
[![Yarn](https://img.shields.io/badge/-~=1.22-2c8ebb?style=for-the-badge&label=&logo=yarn&logoColor=fff)](https://classic.yarnpkg.com)
[![MySQL](https://img.shields.io/badge/->=8-4479a1?style=for-the-badge&label=&logo=mysql&logoColor=fff)](https://www.mysql.com)
[![NestJS](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/@nestjs/core?style=for-the-badge&label=&color=e0234e&logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/dev/typescript?style=for-the-badge&label=&color=007acc&logo=typescript)](https://www.typescriptlang.org)
[![Prettier](https://img.shields.io/npm/dependency-version/eslint-plugin-mizyind/prettier?style=for-the-badge&label=&color=f7b93e&logo=prettier&logoColor=fff)](https://prettier.io)
[![ESLint](https://img.shields.io/npm/dependency-version/eslint-plugin-mizyind/eslint?style=for-the-badge&label=&color=4b32c3&logo=eslint&logoColor=fff)](https://eslint.org)

## 💠 Requirement

- NodeJS >= 14
- Yarn ~= 1.22
- MySQL >= 8

## 🌌 Techniques

- **[NestJS](https://nestjs.com)** - A progressive NodeJS framework for building efficient, reliable and scalable server-side applications.
  - **[@nestjs/cli](https://github.com/nestjs/nest-cli)** - CLI tool for Nest.
  - **[@nestjs/jwt](https://github.com/nestjs/jwt)** - Utilities module based on the JWT package.
  - **[@nestjs/config](https://github.com/nestjs/config)** - Configuration module for Nest.
  - **[@nestjs/typeorm](https://github.com/nestjs/typeorm)** - TypeORM module for Nest.
  - **[@nestjs/swagger](https://github.com/nestjs/swagger)** - OpenAPI (Swagger) module for Nest.
  - **[@nestjs/passport](https://github.com/nestjs/passport)** - .Passport module for Nest.
  - **[@nestjs/schematics](https://github.com/nestjs/schematics)** - Nest architecture element generation based on Angular schematics.
  - **[@nestjs/platform-express](https://www.npmjs.com/package/@nestjs/platform-express)** - Under the hood, Nest makes use of Express.
  - **[@nestjs/microservices](https://www.npmjs.com/package/@nestjs/microservices)** - In Nest, a microservice is fundamentally an application.
  - **[@nestjsx/crud](https://github.com/nestjsx/crud)** - Nest CRUD for RESTful APIs.
  - **[@nestjsx/crud-request](https://www.npmjs.com/package/@nestjsx/crud-request)** - Request builder/parser for handling and validating params on a backend side.
  - **[@nestjsx/crud-typeorm](https://www.npmjs.com/package/@nestjsx/crud-typeorm)** - Provides methods for CRUD database operations.
- **[Swagger](https://swagger.io)** - API Documentation & Design Tools for Teams.
  - **[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)** - Adds middleware to express app to serve the Swagger UI.
- **[RabbitMQ](https://www.rabbitmq.com)** - Messaging that just works.
  - **[amqplib](https://github.com/squaremo/amqp.node)** - AMQP 0-9-1 library and client for NodeJS.
  - **[amqp-connection-manager](https://github.com/jwalton/node-amqp-connection-manager)** - Auto-reconnect and round robin support for amqplib.
- **[Passport](http://www.passportjs.org)** - Simple, unobtrusive authentication for NodeJS.
  - **[passport-jwt](https://github.com/mikenicholson/passport-jwt)** - Passport authentication using JSON Web Tokens.
- **[RxJS](https://rxjs.dev)** - A reactive programming library for JS.
- **[Bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - A library to help you hash passwords.
- **[RIMRAF](https://github.com/isaacs/rimraf)** - A `rm -rf` util for NodeJS.
- **[TypeORM](https://typeorm.io)** - Amazing ORM for TS and JS.
- **[Reflect Metadata](https://github.com/rbuckton/reflect-metadata)** - Prototype for a Metadata Reflection API for ECMAScript.
- **[Class Validator](https://github.com/typestack/class-validator)** - Decorator-based property validation for classes.
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Decorator-based transform-, serializ-, and deserialization between objects and classes.
- **[TypeScript](https://www.typescriptlang.org)** - Typed JS at Any Scale.
  - **[ts-node](https://github.com/TypeStrong/ts-node)** - TS execution and REPL for NodeJS.
  - **[tslib](https://github.com/microsoft/tslib)** - Runtime library for TypeScript helpers.
- **[Prettier](https://prettier.io)** - Opinionated Code Formatter.
- **[ESLint](https://eslint.org)** - Pluggable JS linter.
  - **[typescript-eslint](https://typescript-eslint.io)** - Monorepo for all the tooling which enables ESLint to support TypeScript.
  - **[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)** - Turns off all rules that are unnecessary or might conflict with Prettier.
  - **[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)** - ESLint plugin for Prettier formatting.
- **[Husky](https://github.com/typicode/husky)** - Git hooks made easy.
  - **[commitlint](https://github.com/conventional-changelog/commitlint)** - Lint commit messages.
    - **[@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)** - Primary way to interact with commitlint.
    - **[@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)** - Shareable commitlint config enforcing conventional commits.

## 🔮 Usage

Run development environment:

```bash
# Install packages
$ yarn
# Up docker compose environment
$ docker-compose -f docker-compose-local.yml up
# Setup dotenv variables
$ cp .env.example .env
# Launch app
$ yarn dev
```

Build & Run production environment:

```bash
# Install packages
$ yarn
# Build project
$ yarn build
# Launch app through Yarn
$ yarn start
# Launch app through Node
$ node dist/main.js
```

## 🖋 Author

miZyind <mizyind@gmail.com>

## 📇 License

Licensed under the [MIT](LICENSE) License.

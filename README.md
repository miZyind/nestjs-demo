# NestJS Demo

[![Framework](https://img.shields.io/badge/Framework-NestJS-orange.svg?style=flat-square)](https://nestjs.com)
[![Language](https://img.shields.io/badge/Language-TypeScript-blue.svg?style=flat-square)](https://www.typescriptlang.org)
[![Database](https://img.shields.io/badge/Database-MySQL-blueviolet.svg?style=flat-square)](https://www.mysql.com)

## 💠 Requirement

- NodeJS >= 14
- MySQL >= 8
  - Auto migration: true

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

## 🌌 Techniques

- **[NestJS](https://nestjs.com)** - A progressive NodeJS framework for building efficient, reliable and scalable server-side applications.
  - **[@nestjs/platform-express](https://github.com/expressjs/express)** - Fast, unopinionated, minimalist web framework for NodeJS.
  - **[@nestjs/typeorm](https://typeorm.io)** - ORM for TypeScript and JavaScript (ES7, ES6, ES5).
  - **[@nestjs/swagger](https://swagger.io)** - Simplify API development for users, teams, and enterprises.
- **[TypeScript](https://www.typescriptlang.org)** - Typed superset of JavaScript that compiles to plain JavaScript.
  - **[ts-node](https://github.com/TypeStrong/ts-node)** - TypeScript execution and REPL for NodeJS.
  - **[typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)** - Monorepo for all the tooling which enables ESLint to support TypeScript.
- **[Husky](https://github.com/typicode/husky)**- Git hooks made easy.
  - **[Commitlint](https://commitlint.js.org)**- Lint commit messages.
    - **[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint)**- Lint your conventional commits.
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Proper decorator-based transformation, serialization, deserialization of pojo to class constructors.
- **[Class Validator](https://github.com/typestack/class-validator)** - Validation made easy using TypeScript decorators.
- **[Reflect Metadata](https://github.com/rbuckton/reflect-metadata)** - Prototype for a Metadata Reflection API for ECMAScript.
- **[RxJS](https://rxjs.dev)**- A reactive programming library for JavaScript.
- **[Prettier](https://prettier.io)** - An opinionated code formatter.

## Author

miZyind <mizyind@gmail.com>

## LICENSE

Licensed under the [MIT](LICENSE) License.

# NestJS Demo

[![Docker](https://img.shields.io/badge/docker-2496ed?style=for-the-badge&logo=docker&logoColor=fff)](https://www.docker.com)
[![NodeJS](https://img.shields.io/badge/->=14-339933?style=for-the-badge&label=&logo=node.js&logoColor=fff)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/->=8-4479a1?style=for-the-badge&label=&logo=mysql&logoColor=fff)](https://www.mysql.com)
[![NestJS](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/@nestjs/core?style=for-the-badge&label=&color=e0234e&logo=nestjs)](https://nestjs.com)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/dev/typescript?style=for-the-badge&label=&color=007acc&logo=typescript)](https://www.typescriptlang.org)
[![ESLint](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/dev/eslint?style=for-the-badge&label=&color=4b32c3&logo=eslint&logoColor=fff)](https://eslint.org)
[![Prettier](https://img.shields.io/github/package-json/dependency-version/mizyind/nestjs-demo/dev/prettier?style=for-the-badge&label=&color=f7b93e&logo=prettier&logoColor=fff)](https://prettier.io)
[![License](https://img.shields.io/badge/LIC.-mit-404040?style=for-the-badge&labelColor=000)](https://github.com/miZyind/nestjs-demo/blob/master/LICENSE)

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

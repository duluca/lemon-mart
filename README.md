# <img src="https://user-images.githubusercontent.com/822159/76695715-1cd40180-6659-11ea-8815-00f0e1d7a209.png" alt="LemonMart" width="36"/> LemonMart
The enterprise-ready Angular template project with REST and GraphQL RBAC pre-configured.

> LemonMart was implemented with a [Route-first architecture](https://techtalkdc.com/router-first-architecture-in-spas/) to designing SPAs.

> See [Changes](#changes) section for important or breaking changes made to the project.

![Angular Version](https://img.shields.io/badge/angular-v17-326839)
[![CircleCI](https://circleci.com/gh/duluca/lemon-mart.svg?style=svg)](https://circleci.com/gh/duluca/lemon-mart)
[![Coverage Status](https://coveralls.io/repos/github/duluca/lemon-mart/badge.svg?branch=main)](https://coveralls.io/github/duluca/lemon-mart?branch=main)
[![DeepScan grade](https://deepscan.io/api/projects/2669/branches/18284/badge/grade.svg)](https://deepscan.io/dashboard#view=project&pid=2669&bid=18284)

![devs served](https://img.shields.io/badge/devs%20served-32%2C528-F3DE48)
![lemons served](https://img.shields.io/badge/lemons%20served-257%2C428-F3DE48)
<sup>As of August 2023</sup>

![lemon-mart-profile](https://github.com/duluca/lemon-mart/assets/822159/d90b9aba-bc34-409f-a55b-ade3fb6c0b7f)

## Get the book & watch the talk

LemontMart has been developed to support my book _Angular for Enterprise Applications_. You can get the book at any major bookstore or find the links at [AngularForEnterprise.com](https://AngularForEnterprise.com).

Watch the talk on `Architecture for Scalable Angular Apps` on [Pluralsight](https://www.pluralsight.com/courses/angular-denver-2019-session-28).

Check out the slides for `Architecture for Scalable Angular Apps` _free_ at [Slides.com](https://slides.com/doguhanuluca/architecture-for-scalable-angular-apps#).

Check out **LocalCast Weather**to learn Angular, Material, and RxJS fundamentals using OpenWeatherMap.org APIs at https://github.com/duluca/local-weather-app.

Build, debug, and publish Docker images with [**npm Scripts for Docker**](https://bit.ly/npmScriptsForDocker) and achieve Blue-Green deployments on AWS Fargate with [**npm Scripts for AWS**](https://bit.ly/npmScriptsForAWS).

## Router-first Architecture

A router-first architecture to SPA design will save development teams, large and small, significant waste in duplicative work and re-architecting of the code base to enable better collaboration or achieve sub-second first meaningful paints in your application.

In order to pull off a router-first implementation, you need to:

1. Define user roles and a site map early on,
2. Design with lazy loading in mind, leveraging router outlets, auxiliary paths, and smart link tracking,
3. Implement a walking-skeleton navigation experience and validate, allowing multiple teams to execute seamlessly,
4. Design around major data components, using stateless data-driven components using RxJS/BehaviorSubjects,
5. Be disciplined in sticking to a decoupled component architecture, allowing remixing the UX quickly to respond to changes in requirements without having to re-architect the codebase,
6. Differentiate between user controls and components to appropriately use binding, resolve, and auth guards,
7. With TypeScript classes, interfaces, enums, validators, and pipes to maximize code reuse

### Design Artifacts

Head over to the Wiki for user roles, site maps, data entity diagrams, and user mock-ups:
https://github.com/duluca/lemon-mart/wiki.

## Building Lemon Mart

- `npm run build:prod` is used to build a production-optimized version of the app.
- `npm run docker:debug` to run tests and build a containerized version of the app.
- `integration.Dockerfile` is a multi-stage Dockerfile that can be used to consistently build and test the app in various CI environments. The optimized image generated in the last step can then be deployed to any Docker host, including AWS, Heroku, Vercel, and Azure.

### Authentication

For demonstration purposes, the login screen shows the _Authentication Mode_ of the app. There are three modes:

- InMemory: [auth.in-memory.service.ts](https://github.com/duluca/lemon-mart/blob/main/src/app/auth/auth.in-memory.service.ts)
- Custom: [auth.custom.service.ts](https://github.com/duluca/lemon-mart/blob/main/src/app/auth/auth.custom.service.ts)
- Custom GraphQL: [auth.graphql.custom.service.ts](https://github.com/duluca/lemon-mart/blob/main/src/app/auth/auth.graphql.custom.service.ts)
- Firebase: [auth.firebase.service.ts](https://github.com/duluca/lemon-mart/blob/main/src/app/auth/auth.firebase.service.ts)

The current mode can be adjusted in `environment.ts`. You can see how each mode is implemented in the link source files above.

> This is covered in more detail in [Angular for Enterprise Applications, 3rd Edition](https://www.amazon.com/Angular-Enterprise-Applications-Router-first-architecture/dp/1805127128).

### Build Configurations

3 build configurations map to authentication modes:

1. Production:

Executing `npm run build:prod` or `npx ng build --configuration production` or `npx ng build --configuration=production` leverages `InMemory` authentication. Note that the fake credentials are documented on the Login screen.

2. Firebase:

Executing `npx ng build --configuration=firebase` leverages `Firebase` authentication. For this to work, you must set up your own Firebase back-end and create a user in the Firebase console.

3. Lemon-Mart-Server:

Executing `npx ng build --configuration=lemon-mart-server` leverages `Custom` authentication. This is implemented by the example project Lemon Mart Server, which is detailed below.

### Lemon Mart Server

Lemon Mart Server is an easy-to-learn and use TypeScript Node.js server using [Minimal MEAN](https://github.com/duluca/minimal-mean) for [Lemon Mart](https://github.com/duluca/lemon-mart).

To run Lemon Mart in a full-stack setup, visit https://github.com/duluca/lemon-mart-server.

## Developers

This project is a sample implementation containing numerous recipes and design patterns useful for developing an Angular application.

If you'd like to use this project as a starter or a template project for your project, you can get many benefits from using a pre-configured project. Some of the benefits are:

- Optimized development experience for VS Code
- Lazy loading feature module configuration
- A responsive landing, login, and user profile experience
- Angular Material and Flex Layout configured for UI development
- npm scripts for `style` and `lint` checks, building docker containers, testing, or deploying your app
- CircleCI configuration for Continuous Integration
- Pre-wired extensible authentication and authorization module
- And many more.

### Pre-requisites

- Do NOT install `@angular/cli` or `typescript` globally to avoid version mismatch issues across multiple projects.
  - Note: When creating new projects in the future, execute `npx @angular/cli new app-name --routing` to create a new Angular app with basic routing wired.
  - If you have trouble with this command, try `npx -p @angular/cli new app-name --routing`
- To run `ng` commands from within the project directory, preprend `npx` to commands, like `npx ng build`.
- To continue using `ng` without having to prepend `npx`, configure shell autofallback as described here: https://www.npmjs.com/package/npx#shell-auto-fallback.

### Adapting the template

- Fork and clone this repo.
- Rename the repo on GitHub to match the name of your project.
- Search and replace references to `lemon-mart` with your project name and git repo.
- Remove `manager`, `pos`, and `inventory` folders and references to them from `app-routing.module.ts`.
- You may modify `profile.component.ts` and `view-user.component.ts` under the `user` folder to fit your needs.
- Edit `lemonmart-theme.scss` to match your desired color scheme.
- Now you may begin implementing your own feature modules.
  - Questions? Consider creating an issue on this repo and buying my book at [AngularForEnterprise.com](https://AngularForEnterprise.com).

### During Development

- Run `npm start` for a developmenet web server.
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
- Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `npm run e2e` to execute the end-to-end tests via [Cypress](https://cypress.io).

### Code scaffolding

- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Further help with Angular CLI

> To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Full-Stack Setup with Docker Compose and Deploying to AWS

See the example project here https://github.com/duluca/lemon-mart-server

# Changes

Changes are inevitable to keep the project up-to-date with libraries, tools, patterns and practices. Below are some notable changes that differ from the 1st, 2nd, and 3rd edition of my book.

## Angular 17

- Moved to control flow syntax
- Global spinner demonstrating SignalState

## Angular 16

- Renamed `projects` from `ch2` format to `stage2`, so they make sense in the 3rd edition.
- Dropped `ch13` and `ch14` as there are no meaningful changes between projects. Refer to the main application under `src` for reference.
- Replaced tslint with eslint
- Replaced protractor with cypress for e2e, added tests
- Removed SharedModule, and implemented shared components as Standalone components
- Moved to Standalone project configuration
- Added GraphQL auth provider
- Removed subsink in favor of `takeUntilDestroyed`

## Angular 13-15

- Updated `dev-norms.md`
- Introduced `ngx-mock` to supplement `angular-unit-test-helper` for mocking components
- Replaced `@angular/flex-layout` with `@ngbracket/ngx-layout`
- Removed `jsbeautify` and `import-sort` in prep for migration to eslint
- Disabled code coverage in prep for migration to Jest
- Updated `style` and `lint` scripts
- Updated `config.yml` for CircleCI updates
- Refactored `AuthGuard`
- Replaced `tslint` with `eslint`
- Removed `protractor` and `e2e` scripts

## Angular 12 configuration changes

- Enabled bundle budgets
- Introduction `development` configuration
- Made `production` configuration the default one
- Added `npm run watch` command
- Strict settings on by default
- When using `mat-table` the `[dataSource]` property should NOT be set using an `async` pipe. Correct use is `[dataSource]="items$"`. See `user-table.component.html`.
- Use of `FormGroupName` in `profile.component.html`

## Renamed `master` branch to `main`

If you already have a `master` branch locally, then execute the following commands:

```
git branch -m master main
git fetch origin
git branch -u origin/main main
git remote set-head origin -a
```

## Augury

- `Augury` extension is deprecated. Get use `Angular DevTools` instead: https://angular.io/guide/devtools.

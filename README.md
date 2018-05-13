# LemonMart
> LemonMart was implemented with a Route-first approach to designing SPAs.

[![Waffle.io - Columns and their card count](https://badge.waffle.io/duluca/lemon-mart.svg?columns=all)](https://waffle.io/duluca/lemon-mart)

![lemon-mart-login](https://user-images.githubusercontent.com/822159/36320811-80a9c5f8-1315-11e8-8ba1-d7a62c31ec79.png)

## Get the book
LemontMart has been developed in support of my book _Angular 6 for Enterprise-Ready Web Applications_. You can get the book on http://AngularForEnterprise.com.

Check out **LocalCast Weather**, to learn Angular, Material, RxJS fundemantals using OpenWeatherMap.org APIs, at https://github.com/duluca/local-weather-app.

Build, debug and publish Docker images with [**npm Scripts for Docker**](bit.ly/npmScriptsForDocker) and achieve Blue-Green deployments on AWS Fargate with [**npm Scripts for AWS**](bit.ly/npmScriptsForAWS).

## Router-first Approach
A router-first approach to SPA design will save development teams, large and small, significant waste in duplicative work, and re-architecting of the code base to enable better collaboration or achieve sub-second first meaningful paints in your application.

In order to pull off a router-first implementation, you need to:
1. Define user roles and a site-map early on,
2. Design with lazy loading in mind, leveraging router outlets, auxiliary paths and smart link tracking,
3. Implement a walking-skeleton navigation experience and validate, allowing multiple teams to execute seamlessly,
4. Design around major data components, using stateless data-driven components using RxJS/BehaviorSubjects,
5. Be disciplined in sticking to a decoupled component architecture, allowing remixing the UX quickly to respond to changes in requirements without having to re-architect the codebase,
6. Differentiate between user controls and components to appropriate use binding, resolve and auth guards,
7. With TypeScript classes, interfaces, enums, validators and pipes maximize code reuse

### Design Artifacts
Head over to the Wiki for user roles, site maps, data entity diagrams and user mock ups:
https://github.com/duluca/lemon-mart/wiki.

## Build
- `npm run build:prod` to build a production optimized version of the app.
- `npm run docker:debug` to run tests and build a containerized version of the app.
- Dockerfile.integration is a multi-stage Dockerfile that can be used to build and test the app in various CI environments in a consistent mannger. The optimized image generated in the last step, can then be deployed to any Docker host, including AWS, Heroku, Zeit Now and Azure.
### Swagger Mock Server
Swagger, in a yaml/json format, establishes a data contract between the front-end and back-end. Using code generators, you can create a mock server that responds to requests with auto-generated or customized data. A sample server can be found here:
https://github.com/duluca/lemon-mart-swagger-server.
- `npm run mock:start` to build a production optimized version of the app, running on port 8080, connected to the mock server.
- `npm run mock:stop` to stop

## Developers
### Pre-requisites
- Do NOT install `@angular/cli` or `typescript` globally to avoid version mismatch issues across multiple projects.
- Run `npx @angular/cli new app-name --routing` to create a new Angular app with basic routing wired.
- To run `ng` commands from within the project directory, preprend `npx` to commands, like `npx ng build`.
- To continue using `ng` without having to prepend `npx`, configure shell autofallback as described here: https://www.npmjs.com/package/npx#shell-auto-fallback.
### During Development
- Run `npm start` for a developmenet server. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.
- Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
- Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
### Code scaffolding
- Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
### Further help with Angular CLI
> This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
### Full-Stack Setup with Docker Compose and Deploying to AWS
See my example project here https://github.com/excellalabs/minimal-mean


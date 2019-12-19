FROM duluca/minimal-node-chromium:lts-alpine as tester
#FROM circleci/node:lts-browsers
#FROM chromium

WORKDIR /usr/src

COPY . .

# install dependencies and build
RUN npm ci

# force update the webdriver, so it runs with latest version of Chrome
RUN cd ./node_modules/protractor && npm i webdriver-manager@latest

WORKDIR /usr/src

RUN npm run test:prod
# RUN npm run test:prod:e2e



# FROM duluca/minimal-node-chromium:lts-alpine as tester

FROM chromium

ENV TESTER_SRC_DIR=/usr/src

WORKDIR $TESTER_SRC_DIR

COPY . .

ADD ./cache/node_modules ./node_modules
ADD ./cache/dist ./dist

RUN npm run test:prod
# RUN npm run test:prod:e2e

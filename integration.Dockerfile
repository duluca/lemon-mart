FROM duluca/minimal-node-build-env:10.14.2 as builder

ENV BUILDER_SRC_DIR=/usr/src

# setup source code directory and copy source code
WORKDIR $BUILDER_SRC_DIR
COPY . .

# install dependencies and build
RUN yes | npm ci
RUN npm run build:prod

FROM slapers/alpine-node-chromium:10 as tester

ENV BUILDER_SRC_DIR=/usr/src
ENV TESTER_SRC_DIR=/usr/src

WORKDIR $TESTER_SRC_DIR
COPY --from=builder $BUILDER_SRC_DIR .

RUN npm run test:prod
# RUN npm run $TEST_SCRIPT:e2e

FROM duluca/minimal-nginx-web-server:1.15.7-alpine

ENV BUILDER_SRC_DIR=/usr/src

COPY --from=builder $BUILDER_SRC_DIR/dist/lemon-mart /var/www
CMD 'nginx'

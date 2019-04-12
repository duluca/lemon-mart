FROM duluca/minimal-node-build-env:10.14.2 as builder

# project variables
ENV SRC_DIR /usr/src
ENV GIT_REPO https://github.com/duluca/lemon-mart.git
ENV BUILD_SCRIPT build:prod

# get source code
RUN mkdir -p $SRC_DIR
WORKDIR $SRC_DIR
# if necessary, do SSH setup here or copy source code from local or CI environment
ARG CACHEBUST=1
RUN git clone $GIT_REPO .

RUN yes | npm ci
RUN npm run $BUILD_SCRIPT

FROM slapers/alpine-node-chromium:10 as tester
ENV BUILDER_SRC_DIR /usr/src
ENV SRC_DIR /usr/src
ENV TEST_SCRIPT test:prod

RUN mkdir -p $SRC_DIR
WORKDIR $SRC_DIR
COPY --from=builder $BUILDER_SRC_DIR $SRC_DIR

RUN npm run $TEST_SCRIPT
# RUN npm run $TEST_SCRIPT:e2e

FROM duluca/minimal-nginx-web-server:1.15.7-alpine
ENV BUILDER_SRC_DIR /usr/src
COPY --from=builder $BUILDER_SRC_DIR/dist/lemon-mart /var/www
CMD 'nginx'

FROM duluca/minimal-node-web-server:8.11.1

WORKDIR /usr/src/app

COPY dist public

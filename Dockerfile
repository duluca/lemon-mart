FROM duluca/minimal-node-web-server:10.14.2

WORKDIR /usr/src/app

COPY dist public

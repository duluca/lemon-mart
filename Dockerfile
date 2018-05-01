FROM duluca/minimal-node-web-server:8.6.0

WORKDIR /usr/src/app

COPY dist public

# FROM duluca/minimal-nginx-web-server:1.13.8-alpine
# COPY dist /var/www
# # RUN cp /tmp/default-xproto /etc/nginx/sites-enabled/default
# CMD 'nginx'

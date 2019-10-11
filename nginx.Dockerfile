FROM duluca/minimal-nginx-web-server:1-alpine

COPY dist/lemon-mart /var/www

CMD 'nginx'

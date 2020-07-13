FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

CMD ["./start.sh"]
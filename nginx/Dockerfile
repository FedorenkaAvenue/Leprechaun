FROM nginx:1.14

RUN rm /etc/nginx/conf.d/default.conf && \
    apt update && \
    apt install -y apache2-utils

COPY ./nginx.conf /etc/nginx/
COPY ./leprechaun.conf /etc/nginx/conf.d/

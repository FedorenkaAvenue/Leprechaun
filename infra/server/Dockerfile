FROM nginx:1.27.2

RUN rm /etc/nginx/conf.d/default.conf && \
    apt update && \
    apt install -y apache2-utils tree

# nginx-module-image-filter
RUN echo "deb http://nginx.org/packages/mainline/debian/ stretch nginx" >> /etc/apt/sources.list && \
    apt-get install -y wget gnupg2 && \
    wget https://nginx.org/keys/nginx_signing.key && apt-key add nginx_signing.key && \
    apt-get update && apt-get install nginx-module-image-filter -y

COPY ./conf/nginx.conf /etc/nginx/
COPY ./conf/leprechaun.conf ./conf/leprechaun.dev.conf /etc/nginx/conf.d/

FROM alpine:3.14

ARG SPHINX_PORT

RUN apk add --no-cache mariadb-connector-c-dev \
	postgresql-dev \
	wget \
	mysql mysql-client

RUN mkdir -pv /var/log/sphinx /opt/sphinx/index

RUN wget http://sphinxsearch.com/files/sphinx-3.4.1-efbcc65-linux-amd64-musl.tar.gz -O /tmp/sphinxsearch.tar.gz \
	&& cd /opt/sphinx && tar -xf /tmp/sphinxsearch.tar.gz \
	&& rm /tmp/sphinxsearch.tar.gz

ENV PATH "${PATH}:/opt/sphinx/sphinx-3.4.1/bin"

RUN ln -sv /dev/stdout /var/log/sphinx/query.log && \
	ln -sv /dev/stdout /var/log/sphinx/searchd.log

COPY ./_docker_entrypoint.sh /
COPY ./sphinx.conf /etc/sphinx/sphinx.conf

VOLUME /etc/sphinx

EXPOSE ${SPHINX_PORT}

CMD sh /_docker_entrypoint.sh

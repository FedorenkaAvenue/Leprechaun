FROM alpine:3.14

ARG SPHINX_PORT

RUN apk add --no-cache mariadb-connector-c-dev \
	postgresql-dev \
	wget

RUN mkdir -pv /opt/sphinx/log /opt/sphinx/index

RUN wget http://sphinxsearch.com/files/sphinx-3.4.1-efbcc65-linux-amd64-musl.tar.gz -O /tmp/sphinxsearch.tar.gz \
	&& cd /opt/sphinx && tar -xf /tmp/sphinxsearch.tar.gz \
	&& rm /tmp/sphinxsearch.tar.gz

ENV PATH "${PATH}:/opt/sphinx/sphinx-3.4.1/bin"

RUN ln -sv /dev/stdout /opt/sphinx/log/query.log && \
	ln -sv /dev/stdout /opt/sphinx/log/searchd.log

COPY ./_docker_entrypoint.sh /

VOLUME /opt/sphinx/index
VOLUME /opt/sphinx/log
VOLUME /etc/sphinx

EXPOSE ${SPHINX_PORT}

CMD sh /_docker_entrypoint.sh

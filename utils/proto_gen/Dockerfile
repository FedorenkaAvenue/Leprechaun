# Golang

FROM golang:1.24.3-alpine AS go_bilder


ENV GOBIN=/usr/local/go/bin
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.33 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3

# NodeJS annd final

FROM node:20.19.2-alpine

RUN npm i -g \
    ts-proto \
    grpc-tools \
    protoc-gen-ts \
    node-pre-gyp

COPY --from=go_bilder /usr/local/go /usr/local/go

ENV PATH="/usr/local/go/bin:${PATH}"

RUN apk add --no-cache make \
    && apk add protoc \
    && apk add inotify-tools

WORKDIR /app

COPY . .

CMD ["sh", "watch.sh"]

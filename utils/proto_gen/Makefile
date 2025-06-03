PROTO_DIR=./proto
OUT_TS=./gen/ts
OUT_GO=./gen/go

generate:
	@protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=$(OUT_TS) \
		--ts_proto_opt=nestJs=true,env=browser,esModuleInterop=true \
		--proto_path=$(PROTO_DIR) \
		$(PROTO_DIR)/*.proto

	@protoc \
		--go_out=$(OUT_GO) \
		--go-grpc_out=$(OUT_GO) \
		--proto_path=$(PROTO_DIR) \
		$(PROTO_DIR)/*.proto

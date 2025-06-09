PROTO_DIR=./proto
OUT_TS=./gen/ts
OUT_GO=./gen/go

PROTO_FILES := $(shell find $(PROTO_DIR) -name '*.proto')

generate:
	@echo "Generating TypeScript..."
	@protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=$(OUT_TS) \
		--ts_proto_opt=nestJs=true,env=browser,esModuleInterop=true,useProtoFieldName=true,useDate=true,useOptionals=fields,outputPartialMethods=true,emitDefaultValues=true \
		--proto_path=$(PROTO_DIR) \
		--proto_path=/usr/include \
		$(PROTO_FILES)

	@echo "Generating Go..."
	@protoc \
		--go_out=$(OUT_GO) \
		--go-grpc_out=$(OUT_GO) \
		--proto_path=$(PROTO_DIR) \
		--proto_path=/usr/include \
		$(PROTO_FILES)

move:
	@cp ./gen -r ../../apps/api
	@cp ./gen -r ../../services/auth/client
	@cp ./gen -r ../../services/user/client
	@cp ./gen -r ../../services/prop_group/client
	@cp ./gen -r ../../services/trans/client

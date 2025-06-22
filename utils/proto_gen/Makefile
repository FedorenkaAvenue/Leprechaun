PROTO_DIR=./proto
OUT_TS_SERVER=./gen/ts/server
OUT_TS_CLIENT=./gen/ts/client
OUT_GO=./gen/go

PROTO_FILES := $(shell find $(PROTO_DIR) -name '*.proto')

generate:
	@echo "Generating TS types for server..."
	@protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=$(OUT_TS_SERVER) \
		--ts_proto_opt=nestJs=true,esModuleInterop=true,useProtoFieldName=true,useDate=true,useOptionals=fields,emitDefaultValues=true \
		--proto_path=$(PROTO_DIR) \
		--proto_path=/usr/include \
		$(PROTO_FILES)

	@echo "Generating TS types for client..."
	@protoc \
		--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
		--ts_proto_out=$(OUT_TS_CLIENT) \
		--ts_proto_opt=env=browser,esModuleInterop=true,useProtoFieldName=true,useDate=true,useOptionals=fields,emitDefaultValues=true \
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
	@cp ./gen/ts/client/. -r ../../apps/admin/gen
	@cp ./gen/ts/client/. -r ../../apps/client/gen
	@cp ./gen/ts/server/. -r ../../apps/api/gen
	@cp ./gen/ts/server/. -r ../../services/auth/client/gen
	@cp ./gen/ts/server/. -r ../../services/user/client/gen
	@cp ./gen/ts/server/. -r ../../services/prop_group/client/gen
	@cp ./gen/ts/server/. -r ../../services/trans/client/gen
	@cp ./gen/ts/server/. -r ../../services/category/client/gen
	@cp ./gen/ts/server/. -r ../../services/product/client/gen
	@cp ./gen/ts/server/. -r ../../services/wishlist/client/gen
	@cp ./gen/ts/server/. -r ../../services/history/client/gen

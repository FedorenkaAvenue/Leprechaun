import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";

export type JWTPayloadI = Pick<User, 'id' | 'role'>

import { UserRole } from "./enums"

export interface User {
    id: string
    role: UserRole
    email: string | null
}

export interface SessionI {
    sid: string;
    created_at: Date;
    expire: Date;
    sess: string;
}

export interface SessionDataI {
    ip?: string;
}

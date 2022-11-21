export interface SessionI {
    sid: string;
    created_at: Date;
    expire: Date;
    sess: string;
    // ip?: string;
    // token?: string;
    // url?: string;
}

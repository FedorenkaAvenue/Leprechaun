export interface IDevLogMail {
    method: string
    message: string
    url: string
    body?: string | null
    cookies?: string | null
    stack: string
    ip: string
    timestamp: string
}

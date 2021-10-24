export interface IDevLogMail {
    method: string
    status: number
    message: string
    path: string
    body?: string
    cookies?: string
    stack: string
    ip: string
}

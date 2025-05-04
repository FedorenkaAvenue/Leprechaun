import { PropsWithChildren } from "react"

type DefaultParams = {
    lang: string
}

type DefaultQueries = {
    sort?: string
}

export type RouteProps<P = {}, S = { [key: string]: string | string[] | undefined }> = PropsWithChildren<{
    params: Promise<DefaultParams & P>
    searchParams: Promise<DefaultQueries & S>
}>;

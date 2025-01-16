type DefaultParams = {
    lang: string
}

type DefaultQueries = {
    sort?: string
}

export type RouteProps<P = {}, S = { [key: string]: string | string[] | undefined }> = {
    params: Promise<DefaultParams & P>
    searchParams: Promise<DefaultQueries & S>
};

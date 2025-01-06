type DefaultParams = {
    lang: string
}

export type RouteProps<P = {}, S = { [key: string]: string | string[] | undefined }> = {
    params: Promise<DefaultParams & P>
    searchParams: Promise<S>
};

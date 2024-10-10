declare global {
    interface PropsWithLocale<T> extends T {
        locale: string;
    }
}

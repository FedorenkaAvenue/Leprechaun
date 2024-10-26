/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_DOMAIN_MEDIA: string
    readonly VITE_APP_NAME: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

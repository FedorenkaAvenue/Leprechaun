export interface LanguagesI {
    en: string;
    ua: string;
}

export interface TransI extends LanguagesI {
    id?: number;
    column_id?: string;
}

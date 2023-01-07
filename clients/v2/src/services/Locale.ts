import LANGUAGES from '@constants/languages';
import LanguageT from '@type/Language';

export default class LocaleService {
    static parseLocale(pathname: string): string {
        return pathname.split('/')[1];
    }

    static validateLocale(lang: LanguageT): boolean {
        return LANGUAGES.includes(lang);
    }
}

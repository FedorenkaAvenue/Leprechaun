import { environment } from "environments/environment";

export const CURRENT_TRANSLOCO_CONFIG = {
  availableLangs: ['en'],
  defaultLang: 'en',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: environment.production,
  missingHandler: {
    logMissingKey: !environment.production
  },
  flatten: {
    aot: environment.production
  }
};

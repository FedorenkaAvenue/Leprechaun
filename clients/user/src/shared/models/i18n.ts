import type transType from '@public/locales/en.json';

export type DictionaryModuleModel = () => Promise<typeof transType>;
export type DictionaryModel = Awaited<ReturnType<DictionaryModuleModel>>;

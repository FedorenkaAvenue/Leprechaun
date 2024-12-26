import type transType from '@public/locales/en.json';

export type DictionaryModuleModel = () => Promise<typeof transType>;
export type DictionaryModel = Awaited<ReturnType<DictionaryModuleModel>>;

// export type DictionaryKey2<P extends string> = P extends `${infer K}.${infer Rest}`
//     ? K extends keyof DictionaryModel
//         ? Rest extends keyof DictionaryModel[K]
//             ? DictionaryModel[K][Rest]
//             : DictionaryKey2<Rest>
//         : never
//     : P extends keyof DictionaryModel
//     ? DictionaryModel[P]
//     : never;

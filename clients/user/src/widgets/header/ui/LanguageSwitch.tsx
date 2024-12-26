'use client';

import { FC, useCallback } from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shared/ui/Select";
import { LANGS } from '@shared/constants/i18n_client';
import { useI18n } from '@shared/lib/i18n_client';

const LanguageSwitch: FC = () => {
    const { lang } = useI18n();

    const handleChangeLang = useCallback((newLang: string) => {
        const newPath = window.location.pathname.split('/').slice(2).join('/');
        document.cookie = `lang=${newLang}; path=/;`
        window.location.href = `/${newLang}/${newPath}`;
    }, []);

    return (
        <Select defaultValue={lang} onValueChange={handleChangeLang}>
            <SelectTrigger className='w-20'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {LANGS.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSwitch;

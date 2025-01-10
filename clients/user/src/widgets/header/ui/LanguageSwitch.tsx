'use client';

import { FC, useCallback } from 'react';

import { LANGS } from '@shared/constants/i18n_client';
import { useI18n } from '@shared/lib/i18n_client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@primitives/ui/select';

const LanguageSwitch: FC = () => {
    const { lang, switchLocale } = useI18n();

    const handleChangeLang = useCallback(switchLocale, []);

    return (
        <Select defaultValue={lang} onValueChange={handleChangeLang}>
            <SelectTrigger className='w-16'>
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

'use client';

import { FC, useCallback } from 'react';

import Select from "@shared/ui/Select";
import { LANGS } from '@shared/constants/i18n_client';
import { useI18n } from '@shared/lib/i18n_client';

const LanguageSwitch: FC = () => {
    const { lang, switchLocale } = useI18n();

    const handleChangeLang = useCallback(switchLocale, []);

    return (
        <Select.Root defaultValue={lang} onValueChange={handleChangeLang}>
            <Select.Trigger className='w-16'>
                <Select.Value />
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {LANGS.map(lang => (
                        <Select.Item key={lang} value={lang}>{lang}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default LanguageSwitch;

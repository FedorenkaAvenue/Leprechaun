'use client';

import { FC } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@shared/ui/select";

import getLanguages from '../lib/getLanguages';

const LanguageSwitch: FC = () => {
    return (
        <Select>
            <SelectTrigger className='w-20'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {getLanguages().map(i => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default LanguageSwitch;

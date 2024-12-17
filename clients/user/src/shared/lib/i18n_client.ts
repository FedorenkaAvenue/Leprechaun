'use client'

import { useContext } from 'react';

import { I18nContext } from '@shared/providers/i18n';

export const useI18n = () => useContext(I18nContext);

'use client'

import Link, { type LinkProps } from 'next/link';
import { FC, PropsWithChildren, useContext } from 'react';

import { I18nContext } from '@shared/providers/i18n';

type Props = PropsWithChildren<LinkProps> & {
    className?: string
};

const AppLink: FC<Props> = ({ href, children, ...props }) => {
    const i18n = useContext(I18nContext);

    return (
        <Link
            href={href.toString().startsWith('/') ? `/${i18n.lang}${href}` : href}
            {...props}
        >
            {children}
        </Link>
    );
};

export default AppLink;

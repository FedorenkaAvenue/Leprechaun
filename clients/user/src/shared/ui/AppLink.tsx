'use client'

import Link, { type LinkProps } from 'next/link';
import { FC, PropsWithChildren, useContext } from 'react';

import { I18nContext } from '@shared/providers/i18n';
import { cn } from '@primitives/lib/utils';

type Props = PropsWithChildren<LinkProps> & {
    className?: string
    withAction?: boolean
};

const AppLink: FC<Props> = ({ href, withAction, children, className, ...props }) => {
    const { lang } = useContext(I18nContext);

    return (
        <Link
            {...props}
            href={href.toString().startsWith('/') ? `/${lang}${href}` : href}
            className={cn(withAction && 'text-action hover:text-action-hover', className)}
        >
            {children}
        </Link>
    );
};

export default AppLink;

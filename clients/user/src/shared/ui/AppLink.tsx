'use client'

import Link, { type LinkProps } from 'next/link';
import { FC, PropsWithChildren, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { I18nContext } from '@shared/providers/i18n';
import { cn } from '@primitives/lib/utils';

type Props = PropsWithChildren<LinkProps> & {
    className?: string
    withAction?: boolean // make link view as text link (e.g. blue)
    withActive?: boolean // active link
};

const AppLink: FC<Props> = ({ href, withAction, withActive, children, className, ...props }) => {
    const { lang } = useContext(I18nContext);
    const path = usePathname();

    return (
        <Link
            {...props}
            href={href.toString().startsWith('/') ? `/${lang}${href}` : href}
            className={cn(
                withAction && 'text-action hover:text-action-hover',
                withActive && path.includes(href as string) && 'text-action-active',
                className,
            )}
        >
            {children}
        </Link>
    );
};

export default AppLink;

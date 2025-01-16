'use client'

import Link, { type LinkProps } from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@primitives/lib/utils';
import { useI18n } from '@shared/lib/i18n_client';

type Props = PropsWithChildren<LinkProps> & {
    className?: string
    withAction?: boolean // make link view as text link (e.g. blue)
    withActive?: boolean // active link
};

const AppLink: FC<Props> = ({ href, withAction, withActive, children, className, ...props }) => {
    const { lang } = useI18n();
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

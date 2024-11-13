import NextLink, { type LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

const AppLink = ({ children, ...props }: PropsWithChildren<LinkProps>) => {
    return <NextLink {...props}>{children}</NextLink>;
};

export default AppLink;

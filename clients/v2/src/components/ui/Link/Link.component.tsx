import NextLink from 'next/link';
import { PropsI } from './Link.interface';

export default function Link(props: PropsI) {
    const { href, locale, ...restProps } = props;

    return <NextLink href={`${locale}${href}`} {...restProps} />;
}

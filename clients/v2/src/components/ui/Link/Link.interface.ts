import ClientStateI from '@interfaces/ClientState';
import { LinkProps } from 'next/link';

export interface PropsI extends Omit<LinkProps, 'locale'> {
    locale: ClientStateI['locale'];
    children: any;
}

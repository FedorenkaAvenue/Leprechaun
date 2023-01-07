import ClientStateI from '@interfaces/ClientState';

export interface PropsI {
    locale: ClientStateI['locale'];
    icon: string;
    link: string;
    isLoading: boolean;
    count: number;
    alt: string;
    hoverHandle?: () => void;
}

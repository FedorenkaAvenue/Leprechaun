import { ComponentProps, FC, PropsWithChildren } from 'react';
import { Loader } from 'lucide-react';

import { cn } from '@primitives/lib/utils';

interface Props extends ComponentProps<'button'> {
    customIcon?: boolean
    isLoading?: boolean
}

const IconButton: FC<PropsWithChildren<Props>> = ({ customIcon, children, isLoading, ...props }) => {
    return (
        isLoading
            ? <Loader />
            : (
                <button type='button' {...props} className={cn('outline-0', !customIcon && 'button-with-svg')}>
                    {children}
                </button>
            )
    );
};

export default IconButton;

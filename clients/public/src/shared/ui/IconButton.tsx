import { ComponentProps, FC, PropsWithChildren } from 'react';

import { cn } from '@primitives/lib/utils';

interface Props extends ComponentProps<'button'> {
    customIcon?: boolean
}

const IconButton: FC<PropsWithChildren<Props>> = ({ customIcon, children, ...props }) => {
    return (
        <button type='button' {...props} className={cn('outline-0', !customIcon && 'button-with-svg')}>
            {children}
        </button>
    );
};

export default IconButton;

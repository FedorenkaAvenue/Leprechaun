import { ComponentProps, FC, PropsWithChildren } from 'react';

interface Props extends ComponentProps<'button'> { }

const IconButton: FC<PropsWithChildren<Props>> = ({ children, ...props }) => {
    return (
        <button type='button' {...props} className='outline-0'>
            {children}
        </button>
    );
};

export default IconButton;

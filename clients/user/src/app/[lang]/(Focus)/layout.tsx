import { FC, PropsWithChildren } from 'react';

import AppLink from '@shared/ui/AppLink';
import { APP_NAME } from '@shared/constants/content';

const FocusLayout: FC<PropsWithChildren> = async ({ children }) => {
    return (
        <div className='w-[1200px] flex flex-col gap-4 my-4'>
            <header className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <AppLink href='/'>{APP_NAME}</AppLink>
                </div>
            </header>
            {children}
        </div>
    );
}

export default FocusLayout;

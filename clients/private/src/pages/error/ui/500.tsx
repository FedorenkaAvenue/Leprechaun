import { Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { errorClearAction } from '@shared/models/slices/error';
import { useAppDispatch } from '@shared/models/hooks';

interface Props {
    canUseClient?: boolean
}

const InternalServerErrorPage: FC<Props> = ({ canUseClient }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const close = () => {
        dispatch(errorClearAction());
        navigate('/');
    }

    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Typography variant='h1' color='error'>500</Typography>
            <Typography variant='h4' color='error'>Server error</Typography>
            <img src="/static/500.gif" width='300' height='300' />
            <Typography variant='body1' color='error'>
                Please, contact to admin or developers to solve this problem
            </Typography>
            {
                canUseClient
                && (
                    <div className='text-center'>
                        <Typography>Dont worry, You still can use others pages</Typography>
                        <Typography
                            onClick={close}
                            variant='button'
                            color='primary'
                            className='cursor-pointer'
                        >
                            go home
                        </Typography>
                    </div>
                )
            }
        </div>
    );
};

export default InternalServerErrorPage;

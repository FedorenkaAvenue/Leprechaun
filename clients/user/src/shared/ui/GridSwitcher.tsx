'use client';

import { FC, useContext } from 'react';
import { LayoutGrid, List } from 'lucide-react';

import IconButton from './IconButton';
import { GridSwitcherContext } from '@shared/providers/gridSwitcher';

const GridSwitcher: FC = () => {
    const { type, switchType } = useContext(GridSwitcherContext);

    return (
        <IconButton onClick={switchType}>
            {
                type === 'raw'
                    ? <List width='25' height='25' />
                    : <LayoutGrid width='25' height='25' />
            }
        </IconButton>
    );
};

export default GridSwitcher;

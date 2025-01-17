// 'use client';

// import { FC, ReactNode, use, useContext } from 'react';
// import { Grid3X3, LayoutGrid, List, LogsIcon, Wheat } from 'lucide-react';

// import IconButton from './IconButton';
// import { GridSwitcherContext, GridSwitcherType } from '@shared/providers/gridSwitcher';

// function getIcon(type: GridSwitcherType): ReactNode {
//     switch (type) {
//         case 'grid2': return <LayoutGrid width='25' height='25' />;
//         case 'grid3': return <Grid3X3 width='25' height='25' />;
//         case 'grid4': return <Wheat width='25' height='25' />;
//         case 'grid5': return <LogsIcon width='25' height='25' />;
//         default: return <List width='25' height='25' />;
//     }
// }

// const GridSwitcher: FC = () => {
//     const { type, switchType } = use(GridSwitcherContext);

//     console.log(type);


//     return <IconButton onClick={switchType}>{getIcon(type)}</IconButton>;
// };

// export default GridSwitcher;

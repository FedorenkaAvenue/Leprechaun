// 'use client';

// import { createContext, FC, PropsWithChildren, useReducer } from "react";

// import { GridVariants } from "@shared/ui/Grid";

// export type GridSwitcherType = GridVariants['type'];

// interface GridSwitcherContext {
//     type: GridSwitcherType
//     switchType: () => void
// }

// interface Props {
//     gridTypes: GridSwitcherType[]
// }

// function typeReducer(this: GridSwitcherType[], state: GridSwitcherType): GridSwitcherType {
//     switch (state) {
//         case 'raw': if (this.includes('grid4')) return 'grid5';
//         case 'grid5': if (this.includes('grid5')) return 'grid4';
//         case 'grid4': if (this.includes('grid3')) return 'grid3';
//         case 'grid3': if (this.includes('grid2')) return 'grid2';
//         case 'grid2': if (this.includes('raw')) return 'raw';
//     }
// }

// export const GridSwitcherContext = createContext<GridSwitcherContext>({ type: 'raw', switchType: () => { } });

// const GridSwitcherProvider: FC<PropsWithChildren<Props>> = ({ gridTypes, children }) => {
//     const [type, switchType] = useReducer(typeReducer.bind(gridTypes), gridTypes[0]);

//     return (
//         <GridSwitcherContext.Provider value={{ type, switchType }}>
//             {children}
//         </GridSwitcherContext.Provider>
//     )
// }

// export default GridSwitcherProvider;

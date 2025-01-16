'use client';

import { createContext, FC, PropsWithChildren, useReducer } from "react";

import { GridVariants } from "@shared/ui/Grid";

export type GridSwitcherType = GridVariants['direction'];

interface GridSwitcherContext {
    type: GridSwitcherType
    switchType: () => void
}

interface Props {
    defaultType: GridSwitcherType
}

function typeReducer(state: GridSwitcherType): GridSwitcherType {
    switch (state) {
        case 'raw': return 'column';
        default: return 'raw';
    }
}

export const GridSwitcherContext = createContext<GridSwitcherContext>({ type: 'raw', switchType: () => { } });

const GridSwitcherProvider: FC<PropsWithChildren<Props>> = ({ defaultType, children }) => {
    const [type, switchType] = useReducer(typeReducer, defaultType);

    return (
        <GridSwitcherContext.Provider value={{ type, switchType }}>
            {children}
        </GridSwitcherContext.Provider>
    )
}

export default GridSwitcherProvider;

import { PropsWithChildren, ReactNode } from "react";

import LinearLoader from "./LinearLoader";

interface Props {
    isLoading: boolean
    tools: ReactNode
}

const ContentManager = ({ isLoading, children, tools }: PropsWithChildren<Props>) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end gap-2 items-center sticky top-16 bg-primary-color">
                {tools}
            </div>
            <LinearLoader isLoading={isLoading} />
            {children}
        </div>
    );
};

export default ContentManager;

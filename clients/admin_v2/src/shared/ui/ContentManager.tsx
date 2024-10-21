import LinearProgress from "@mui/material/LinearProgress";
import { PropsWithChildren, ReactNode } from "react";

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
            <div className="h-1">{isLoading && <LinearProgress />}</div>
            {children}
        </div>
    );
};

export default ContentManager;

import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props {
    addLink: string
    isLoading: boolean
}

const ContentManager = ({ addLink, isLoading, children }: PropsWithChildren<Props>) => {
    return (
        <div className="flex flex-col gap-4">
            {isLoading && <LinearProgress />}
            <div className="flex justify-end">
                <Link to={addLink}>
                    <Button variant="contained">Add</Button>
                </Link>
            </div>
            {children}
        </div>
    );
};

export default ContentManager;

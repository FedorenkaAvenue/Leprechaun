import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface Props {
    addLink: string
    isLoading: boolean
    searchhandle: ChangeEventHandler<HTMLInputElement>
}

const ContentManager = ({ addLink, searchhandle, isLoading, children }: PropsWithChildren<Props>) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end gap-2 items-center sticky top-16 bg-primary-color">
                <TextField
                    onChange={searchhandle}
                    size="small"
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                />
                <Link to={addLink}><Button variant="contained">Add</Button></Link>
            </div>
            <div className="h-1">{isLoading && <LinearProgress />}</div>
            {children}
        </div>
    );
};

export default ContentManager;

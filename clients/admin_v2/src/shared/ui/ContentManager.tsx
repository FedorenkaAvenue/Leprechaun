import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { ChangeEventHandler, PropsWithChildren } from "react";

interface Props {
    addItemHandle: () => void
    isLoading: boolean
    searchhandle: ChangeEventHandler<HTMLInputElement>
}

const ContentManager = ({ addItemHandle, searchhandle, isLoading, children }: PropsWithChildren<Props>) => {
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
                <Button onClick={addItemHandle} variant="contained">Add</Button>
            </div>
            <div className="h-1">{isLoading && <LinearProgress />}</div>
            {children}
        </div>
    );
};

export default ContentManager;

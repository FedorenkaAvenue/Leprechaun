import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";
import { useDebounce } from "@uidotdev/usehooks";
import { PropsWithChildren, useEffect, useState } from "react";

interface Props {
    addItemHandle: () => void
    isLoading: boolean
    searchhandle: (val: string) => void
}

const ContentListManager = ({ addItemHandle, searchhandle, isLoading, children }: PropsWithChildren<Props>) => {
    const [searchVal, setSearchVal] = useState<string>("");
    const debounceVal = useDebounce(searchVal, 1000);

    useEffect(() => {
        debounceVal && searchhandle(debounceVal);
    }, [debounceVal]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end gap-2 items-center sticky top-16 bg-primary-color">
                <TextField
                    onChange={({ target: { value } }) => setSearchVal(value)}
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

export default ContentListManager;

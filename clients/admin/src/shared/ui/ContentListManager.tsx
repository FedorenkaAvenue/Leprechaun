import { Button, Pagination } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import LinearLoader from "./LinearLoader";
import TextInput from "./TextInput";
import PaginationModel from "@shared/models/Pagination";

interface Props {
    addItemHandle: () => void
    isLoading: boolean
    searchHandle: (val: string) => void
    pagination?: {
        data: PaginationModel<unknown> | undefined
        setPage: (page: number) => void
    }
    additionalTools?: ReactNode
}

const ContentListManager = ({
    addItemHandle, searchHandle, isLoading, children, pagination, additionalTools,
}: PropsWithChildren<Props>) => {
    const [prevPagination, setPrevPagination] = useState(pagination?.data);
    const [searchVal, setSearchVal] = useState<string>("");
    const debounceVal = useDebounce(searchVal, 1000);

    useEffect(() => {
        if (pagination?.data) setPrevPagination(pagination.data);
    }, [pagination?.data]);

    useEffect(() => {
        if (debounceVal) searchHandle(debounceVal);
    }, [debounceVal, searchHandle]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-end gap-2 items-center sticky top-16 bg-primary-color">
                {additionalTools}
                <TextInput
                    onChange={({ target: { value } }) => setSearchVal(value)}
                    size="small"
                    label="Search"
                />
                <Button onClick={addItemHandle} variant="contained">Add</Button>
            </div>
            <LinearLoader isLoading={isLoading} />
            {children}
            {
                prevPagination
                && <Pagination
                    sx={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: '10px', left: '50%' }}
                    count={prevPagination?.pagination.pageCount}
                    page={prevPagination?.pagination.currentPage || 1}
                    onChange={(_, page) => pagination?.setPage(page)}
                    color="primary"
                    disabled={!pagination?.data?.pagination.totalCount}
                />
            }
        </div>
    );
};

export default ContentListManager;

import { Button, Pagination as PaginationUI } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import LinearLoader from "./LinearLoader";
import TextInput from "./TextInput";
import { Pagination } from "@shared/models/interfaces";

interface Props {
    isLoading: boolean
    searchHandle?: (val: string) => void
    addItemHandle?: () => void
    pagination?: {
        data: Pagination<unknown> | undefined
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
        if (debounceVal) searchHandle?.call(null, debounceVal);
    }, [debounceVal, searchHandle]);

    return (
        <div className="grid gap-2">
            <div className="flex justify-end gap-2 items-center bg-primary-color">
                {additionalTools}
                {searchHandle && (
                    <TextInput
                        onChange={({ target: { value } }) => setSearchVal(value)}
                        size="small"
                        label="Search"
                    />
                )}
                {addItemHandle && <Button onClick={addItemHandle} variant="contained">Add</Button>}
            </div>
            <LinearLoader isLoading={isLoading} />
            {children}
            {
                prevPagination
                && (
                    <PaginationUI
                        sx={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: '10px', left: '50%' }}
                        count={prevPagination?.pagination.pageCount}
                        page={prevPagination?.pagination.currentPage || 1}
                        onChange={(_, page) => pagination?.setPage(page)}
                        color="primary"
                        disabled={!pagination?.data?.pagination.totalCount}
                    />
                )
            }
        </div>
    );
};

export default ContentListManager;

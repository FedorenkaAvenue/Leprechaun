import ContentManager from "@shared/ui/ContentManager";
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEventHandler, useState } from "react";

import { usePropertyGroups } from "../api/hooks";
import { CREATE_SEGMENT } from "@shared/constants/routes";
import PropertyGroup from "./PropertyGroup";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Paper } from "@mui/material";

const PropertyGroups = () => {
    const [searchVal, setSearchVal] = useState<string>("");
    const debounceVal = useDebounce(searchVal, 1000);
    const { data, isFetching } = usePropertyGroups();

    const search: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
        setSearchVal(value);
    }

    return (
        <div>
            <ContentManager searchhandle={search} isLoading={isFetching} addLink={CREATE_SEGMENT}>
                <Box sx={{ margin: 1 }}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="right">Alt name</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align='right'>Properties</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="right">Is primary</TableCell>
                                    <TableCell sx={{ fontWeight: 700 }} align="right">Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.data.map(i => <PropertyGroup key={i.id} {...i} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </ContentManager>
        </div>
    );
};

export default PropertyGroups;

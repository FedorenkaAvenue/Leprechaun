import ContentManager from "@shared/ui/ContentManager";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

import { usePropertyGroups } from "../api/hooks";
import { PROPERTY_GROUP_CREATE_PATH_SEGMENT } from "@shared/constants/routes";

const PropertyGroup = () => {
    const { data, isFetching } = usePropertyGroups();

    return (
        <div>
            <ContentManager isLoading={isFetching} addLink={PROPERTY_GROUP_CREATE_PATH_SEGMENT}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Alt name</TableCell>
                                <TableCell align="left">Title en</TableCell>
                                <TableCell align="left">Title ua</TableCell>
                                <TableCell align="left">Title ru</TableCell>
                                <TableCell align="left">Is primary</TableCell>
                                <TableCell align="left">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.data.map((row) => (
                                <TableRow key={row.alt_name}>
                                    <TableCell align="left">{row.alt_name}</TableCell>
                                    <TableCell align="left">{row.title.en}</TableCell>
                                    <TableCell align="left">{row.title.ua}</TableCell>
                                    <TableCell align="left">{row.title.ru}</TableCell>
                                    <TableCell align="left">{row.is_primary ? '+' : '-'}</TableCell>
                                    <TableCell align="left">{row.comment}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentManager>
        </div>
    );
};

export default PropertyGroup;

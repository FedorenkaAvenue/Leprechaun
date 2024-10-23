import { useNavigate } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import ContentListManager from "@shared/ui/ContentListManager";
import { usePropertyGroupList } from "@entities/propertyGroup/api/hooks";
import PropertyGroupPreview from "@entities/propertyGroup/ui/PropertyGroupPreview";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import EditButton from "@shared/ui/EditButton";

const PropertyGroupTableWidget = () => {
    const nav = useNavigate();
    const { data, isFetching } = usePropertyGroupList();

    return (
        <ContentListManager
            searchhandle={val => alert(val)}
            isLoading={isFetching}
            addItemHandle={() => nav(CREATE_SEGMENT)}
        >
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Alt name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Property amount</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Is primary</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map(i => (
                            <PropertyGroupPreview
                                key={i.id}
                                renderTools={() => (
                                    <>
                                        <PropertyGroupDeleteButton group={i} />
                                        <EditButton handleClick={() => alert("Хуя")} title="Edit property group" />
                                    </>
                                )}
                                group={i} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ContentListManager>
    );
};

export default PropertyGroupTableWidget;

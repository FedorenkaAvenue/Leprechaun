import { useNavigate } from "react-router";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import ContentListManager from "@shared/ui/ContentListManager";
import Empty from "@shared/ui/Empty";
import PropertyGroupPreviewEntity from "@entities/propertyGroup/ui/PropertyGroupPreview";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import EditButton from "@shared/ui/EditButton";
import PropertyGroupTogglePrimary from "@features/propertyGroup/ui/PropertyGroupTogglePrimary";
import { usePropertyGroupList } from "@entities/propertyGroup/model/hooks";

const PropertyGroupTablePage = () => {
    const nav = useNavigate();
    const { data, isFetching } = usePropertyGroupList();

    return (
        <ContentListManager
            searchHandle={val => alert(val)}
            isLoading={isFetching}
            addItemHandle={() => nav(CREATE_SEGMENT)}
        >
            <Empty data={data?.length} align='center'>
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
                            {data?.map(propGroup => (
                                <PropertyGroupPreviewEntity
                                    key={propGroup.id}
                                    group={propGroup}
                                    renderTools={group => (
                                        <>
                                            <PropertyGroupDeleteButton group={group} />
                                            <EditButton handleClick={() => alert("Хуя")} title="Edit property group" />
                                        </>
                                    )}
                                    renderPublicStatus={group => (
                                        <PropertyGroupTogglePrimary groupId={group.id} selected={group.is_primary} />
                                    )}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Empty>
        </ContentListManager>
    );
};

export default PropertyGroupTablePage;

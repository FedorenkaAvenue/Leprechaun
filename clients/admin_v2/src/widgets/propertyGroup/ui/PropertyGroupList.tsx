import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import ContentListManager from "@shared/ui/ContentListManager";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { usePropertyGroupList } from "@entities/propertyGroup/api/hooks";
import PropertyListWidget from "@widgets/property/ui/PropertyList";
import PropertyGroup from "@entities/propertyGroup/ui/PropertyGroup";
import SelectedGroupContext from "@features/propertyGroup/lib/selectedGroup";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";

const PropertyGroupList = () => {
    const nav = useNavigate();
    const { data, isFetching } = usePropertyGroupList();
    const [propertiesAreOpen, setPropertiesAreOpen] = useState<boolean>(false);
    const [selectedProperties, setSelectedProperties] = useState<PropertyGroupModel['id'] | null>(null);

    function openProperties(group: PropertyGroupModel): void {
        setPropertiesAreOpen(true);
        setSelectedProperties(group.id);
    }

    return (
        <div>
            <ContentListManager
                searchhandle={val => console.log(val)}
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
                                <TableCell sx={{ fontWeight: 700 }} align='right'>Properties</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Is primary</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map(i => (
                                <PropertyGroup
                                    key={i.id}
                                    renderTools={() => (
                                        <PropertyGroupDeleteButton group={i} />
                                    )}
                                    group={i}
                                    openProperties={() => openProperties(i)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentListManager>
            <Drawer
                anchor="right"
                open={propertiesAreOpen}
                onClose={() => setPropertiesAreOpen(false)}
            >
                <SelectedGroupContext.Provider value={selectedProperties}>
                    {selectedProperties && <PropertyListWidget />}
                </SelectedGroupContext.Provider>
            </Drawer>
        </div >
    );
};

export default PropertyGroupList;

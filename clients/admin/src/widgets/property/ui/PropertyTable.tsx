import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

import PropertyModel from "@entities/property/model/Property";
import Property from "@entities/property/ui/Property";
import Empty from "@shared/ui/Empty";
import PropertyDeleteButton from "@features/property/ui/PropertyDeleteButton";
import EditButton from "@shared/ui/EditButton";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroupPreview";

interface Props {
    properties: PropertyModel[] | undefined
    group: PropertyGroupModel | undefined
}

const PropertyTableWidget: FC<Props> = ({ properties, group }) => {
    return (
        <Empty data={properties?.length}>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Alt name</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Titles</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties?.map(i => (
                            <Property
                                property={i}
                                renderTools={property => (
                                    <>
                                        <PropertyDeleteButton groupId={group?.id} property={property} />
                                        <EditButton handleClick={() => alert("Хуя")} title="Edit property group" />
                                    </>
                                )}
                                key={i.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Empty>
    );
};

export default PropertyTableWidget;

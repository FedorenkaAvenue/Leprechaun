import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC } from "react";

import Empty from "@shared/ui/Empty";
import PropertyDeleteButton from "@features/property/ui/PropertyDeleteButton";
import EditButton from "@shared/ui/EditButton";
import { PropertyGroup } from "@entities/propertyGroup/model/interfaces";
import { Property } from "@entities/property/model/interfaces";
import PropertyEntity from "@entities/property/ui/Property";

interface Props {
    properties: Property[] | undefined
    group: PropertyGroup
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
                            <PropertyEntity
                                property={i}
                                renderTools={property => (
                                    <>
                                        <PropertyDeleteButton property={property} />
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

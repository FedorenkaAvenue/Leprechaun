import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

import PropertyModel from "@entities/property/model/Property";
import Property from "@entities/property/ui/Property";

interface Props {
    properties: PropertyModel[] | undefined
    renderPropertyTools?: (property: PropertyModel) => ReactNode
}

const PropertyTableFuture = ({ properties, renderPropertyTools }: Props) => {
    return properties?.length
        ? (
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
                            <Property property={i} renderTools={renderPropertyTools} key={i.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        : <Typography align="center">There are no properties</Typography>
};

export default PropertyTableFuture;

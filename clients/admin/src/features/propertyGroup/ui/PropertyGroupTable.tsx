import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";

import PropertyGroupPreview from "@entities/propertyGroup/ui/PropertyGroupPreview";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import Empty from "@shared/ui/Empty";

interface Props {
    groups: PropertyGroupPreviewModel[] | undefined
    renderGroupTools?: (group: PropertyGroupPreviewModel) => ReactNode
}

export default function PropertyGroupTableFeature({ groups, renderGroupTools }: Props) {
    return (
        <Empty data={groups?.length}>
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
                        {groups?.map(i => (
                            <PropertyGroupPreview key={i.id} renderTools={renderGroupTools} group={i} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Empty>
    );
};

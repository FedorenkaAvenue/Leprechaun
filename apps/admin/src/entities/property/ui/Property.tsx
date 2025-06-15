import { TableCell, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import { Property } from "@gen/_property";

interface Props {
    property: Property
    renderTools?: (property: Property) => ReactNode
}

const PropertyEntity = ({ property, renderTools }: Props) => {
    return (
        <>
            <TableRow className="hover-item">
                <TableCell>{property.id}</TableCell>
                <TableCell>
                    {renderTools?.call(null, property)}
                </TableCell>
                <TableCell>{property.altName}</TableCell>
                <TableCell>
                    <TooltipContent content={<TransList data={property.title} />} />
                </TableCell>
                <TableCell align='right'>
                    {property.comment || <Typography component='span' color='textDisabled'>empty</Typography>}
                </TableCell>
            </TableRow>
        </>
    );
};

export default PropertyEntity;

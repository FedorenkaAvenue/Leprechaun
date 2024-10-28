import { TableCell, TableRow } from "@mui/material";
import { ReactNode } from "react";

import PropertyModel from "../model/Property";
import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";

interface Props {
    property: PropertyModel
    renderTools?: (property: PropertyModel) => ReactNode
}

const Property = ({ property, renderTools }: Props) => {
    return (
        <>
            <TableRow className="hover-item">
                <TableCell>{property.id}</TableCell>
                <TableCell>
                    {renderTools?.call(null, property)}
                </TableCell>
                <TableCell>{property.alt_name}</TableCell>
                <TableCell>
                    <TooltipContent content={<TransList data={property.title} />} />
                </TableCell>
                <TableCell>{property.comment}</TableCell>
            </TableRow>
        </>
    );
};

export default Property;

import { TableCell, TableRow } from "@mui/material";
import { ReactNode } from "react";

import PropertyModel from "../model/Property";

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
                    <ul>
                        <li>{property.title?.en}</li>
                        <li>{property.title?.ru}</li>
                        <li>{property.title?.ua}</li>
                    </ul>
                </TableCell>
                <TableCell>{property.comment}</TableCell>
            </TableRow>
        </>
    );
};

export default Property;

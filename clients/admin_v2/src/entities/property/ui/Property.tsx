import { TableCell, TableRow } from "@mui/material";
import { ReactNode } from "react";

import PropertyModel from "../model/Property";

interface Props {
    property: PropertyModel
    renderTools: () => ReactNode
}

const Property = ({
    property: { alt_name, title, id, comment },
    renderTools,
}: Props) => {
    return (
        <>
            <TableRow className="hover-item">
                <TableCell>{id}</TableCell>
                <TableCell>
                    {renderTools?.call(null)}
                </TableCell>
                <TableCell>{alt_name}</TableCell>
                <TableCell>
                    <ul>
                        <li>{title?.en}</li>
                        <li>{title?.ru}</li>
                        <li>{title?.ua}</li>
                    </ul>
                </TableCell>
                <TableCell>{comment}</TableCell>
            </TableRow>
        </>
    );
};

export default Property;

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

import PropertyGroupModel from "../model/PropertyGroup";

interface Props {
    group: PropertyGroupModel
    openProperties: () => void
    renderTools?: () => ReactNode
}

const PropertyGroup = ({
    group: { id, alt_name, title, is_primary, properties, comment },
    openProperties,
    renderTools,
}: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null)}
            </TableCell>
            <TableCell align="right">{alt_name}</TableCell>
            <TableCell align="right">
                <ul>
                    <li>{title.en}</li>
                    <li>{title.ru}</li>
                    <li>{title.ua}</li>
                </ul>
            </TableCell>
            <TableCell align="right">
                <Typography
                    onClick={openProperties}
                    component='span'
                    className="cursor-pointer"
                    color="info"
                >
                    {properties.length ? `${properties.length} items` : 'none'}
                </Typography>
            </TableCell>
            <TableCell align="right">{is_primary ? 'yes' : 'no'}</TableCell>
            <TableCell align="right">{comment}</TableCell>
        </TableRow >
    );
};

export default PropertyGroup;

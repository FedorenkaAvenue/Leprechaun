import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Tooltip, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import PropertyGroupModel from "../model/PropertyGroup";

interface Props {
    group: PropertyGroupModel
    renderTools?: () => ReactNode
}

const PropertyGroupPreview = ({
    group: { id, alt_name, title, is_primary, properties, comment },
    renderTools,
}: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null)}
            </TableCell>
            <TableCell align="right">
                <Link to={String(id)}>
                    <Typography color='primary'>{alt_name}</Typography>
                </Link>
            </TableCell>
            <TableCell align="right">
                <Tooltip placement='right' title={
                    <ul>
                        <li>en: {title.en}</li>
                        <li>ru: {title.ru}</li>
                        <li>ua: {title.ua}</li>
                    </ul>
                }>
                    <Typography>show</Typography>
                </Tooltip>
            </TableCell>
            <TableCell align="right">
                <Tooltip placement='right' title={
                    <ul>
                        {properties.map(i => (<li>{i.alt_name}</li>))}
                    </ul>
                }>
                    <Typography>{properties.length || 'none'}</Typography>
                </Tooltip>
            </TableCell>
            <TableCell align="right">{is_primary ? 'yes' : 'no'}</TableCell>
            <TableCell align="right">{comment}</TableCell>
        </TableRow >
    );
};

export default PropertyGroupPreview;

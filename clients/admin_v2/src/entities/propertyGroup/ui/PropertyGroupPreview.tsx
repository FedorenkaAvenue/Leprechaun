import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import PropertyGroupModel from "../model/PropertyGroup";
import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";

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
                    <Typography color='primary' component='span'>{alt_name}</Typography>
                </Link>
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={title} />} />
            </TableCell>
            <TableCell align="right">
                <TooltipContent
                    title={properties.length || 'none'}
                    active={Boolean(properties.length)}
                    content={
                        <ul>
                            {properties.map(i => (<li key={i.id}>{i.alt_name}</li>))}
                        </ul>
                    }
                />
            </TableCell>
            <TableCell align="right">{is_primary ? 'yes' : 'no'}</TableCell>
            <TableCell align="right">{comment}</TableCell>
        </TableRow >
    );
};

export default PropertyGroupPreview;

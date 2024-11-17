import { TableCell, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import PropertyGroupPreviewModel from "../model/PropertyGroup";
import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";

interface Props {
    group: PropertyGroupPreviewModel
    renderTools?: (group: PropertyGroupPreviewModel) => ReactNode
    renderPublicStatus: (group: PropertyGroupPreviewModel) => ReactNode
}

const PropertyGroupPreview = ({ group, renderTools, renderPublicStatus }: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{group.id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null, group)}
            </TableCell>
            <TableCell align="right">
                <Link to={String(group.id)}>
                    <Typography color='primary' component='span'>{group.alt_name}</Typography>
                </Link>
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={group.title} />} />
            </TableCell>
            <TableCell align="right">
                <TooltipContent
                    title={group.properties.length || 'none'}
                    active={Boolean(group.properties.length)}
                    content={
                        <ul>
                            {group.properties.map(i => (<li key={i.id}>{i.alt_name}</li>))}
                        </ul>
                    }
                />
            </TableCell>
            <TableCell align="right">{renderPublicStatus(group)}</TableCell>
            <TableCell align="right">
                {group.comment || <Typography component='span' color='textDisabled'>empty</Typography>}
            </TableCell>
        </TableRow >
    );
};

export default PropertyGroupPreview;

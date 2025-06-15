import { TableCell, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link } from "react-router";

import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import { PropertyGroupPreview } from "@gen/property_group";

interface Props {
    group: PropertyGroupPreview
    renderTools?: (group: PropertyGroupPreview) => ReactNode
    renderPublicStatus: (group: PropertyGroupPreview) => ReactNode
}

const PropertyGroupPreviewEntity = ({ group, renderTools, renderPublicStatus }: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{group.id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null, group)}
            </TableCell>
            <TableCell align="right">
                <Link to={String(group.id)}>
                    <Typography color='primary' component='span'>{group.altName}</Typography>
                </Link>
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={group.title} />} />
            </TableCell>
            <TableCell align="right">
                <TooltipContent
                    title={group.properties?.length || 'none'}
                    active={Boolean(group.properties?.length)}
                    content={
                        <ul>
                            {group.properties?.map(i => (<li key={i.id}>{i.altName}</li>))}
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

export default PropertyGroupPreviewEntity;

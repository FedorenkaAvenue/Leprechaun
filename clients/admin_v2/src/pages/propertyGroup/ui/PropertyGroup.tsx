import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import DeleteIcon from '@mui/icons-material/Delete';

import { PropertyGroup as PropertyGroupI } from "@shared/models/PropertyGroup";
import { Drawer, Typography } from "@mui/material";
import ConfirmButton from "@shared/ui/ConfirmButton";
import Properties from "./Properties";
import { useState } from "react";
import { useDeletePropertyGroup } from "../api/hooks";

const PropertyGroup = ({ id, alt_name, title, is_primary, properties, comment }: PropertyGroupI) => {
    const [showProperties, setShowProperties] = useState<boolean>(false);
    const deletePropertyGroup = useDeletePropertyGroup();

    return (
        <>
            <TableRow className="hover:bg-slate-100">
                <TableCell align="left">{id}</TableCell>
                <TableCell align="left">
                    <ConfirmButton
                        title="Confirm deleting"
                        icon={<DeleteIcon />}
                        onAgree={() => deletePropertyGroup.mutate(id)}
                        iconProps={{ color: 'error' }}
                    />
                </TableCell>
                <TableCell align="right">{alt_name}</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">
                    <Typography
                        onClick={() => setShowProperties(true)}
                        component='span'
                        className="cursor-pointer"
                        color="info"
                    >
                        show
                    </Typography>
                </TableCell>
                <TableCell align="right">{is_primary ? 'yes' : 'no'}</TableCell>
                <TableCell align="right">{comment}</TableCell>
            </TableRow >
            <Drawer
                anchor="right"
                open={showProperties}
                onClose={() => setShowProperties(false)}
            >
                <Properties properties={properties} />
            </Drawer>
        </>
    );
};

export default PropertyGroup;

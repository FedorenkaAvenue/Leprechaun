import { IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { MouseEventHandler } from "react";

interface Props {
    title: string
    handleClick: MouseEventHandler<HTMLButtonElement>
}

const EditButton = ({ title, handleClick }: Props) => {
    return (
        <IconButton color='info' onClick={handleClick} title={title}>
            <EditIcon />
        </IconButton>
    );
};

export default EditButton;

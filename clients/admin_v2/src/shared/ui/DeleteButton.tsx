import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton from "./ConfirmButton";

export interface SharedProps {
    icon?: FC
    withoutIcon?: boolean
    removeCallback?: () => void
}

interface Props extends SharedProps {
    handleAgree: () => void
    modalTitle: JSX.Element
}

const DeleteButton = ({ modalTitle, icon = DeleteIcon, withoutIcon, handleAgree }: Props) => {
    return (
        <ConfirmButton
            buttonTitle="Delete category"
            modalTitle={modalTitle}
            icon={withoutIcon ? undefined : icon}
            onAgree={handleAgree}
            iconProps={{ color: 'error', variant: 'contained' }}
        />
    );
};

export default DeleteButton;

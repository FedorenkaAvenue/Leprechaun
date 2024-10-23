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
    buttonTitle: string
}

const DeleteButton = ({ modalTitle, icon = DeleteIcon, withoutIcon, handleAgree, buttonTitle }: Props) => {
    return (
        <ConfirmButton
            buttonTitle={buttonTitle}
            modalTitle={modalTitle}
            icon={withoutIcon ? undefined : icon}
            onAgree={handleAgree}
            iconProps={{ color: 'error', variant: 'contained' }}
        />
    );
};

export default DeleteButton;

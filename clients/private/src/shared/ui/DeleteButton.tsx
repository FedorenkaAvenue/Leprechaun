import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton, { ConfirmButtonProps } from "./ConfirmButton";

export interface DeleteButtonProps extends ConfirmButtonProps {
    withoutIcon?: boolean
}

const DeleteButton = ({
    modalTitle, withoutIcon, buttonTitle, modalContent, icon = DeleteIcon, ...props
}: DeleteButtonProps) => {
    return (
        <ConfirmButton
            buttonTitle={buttonTitle}
            modalTitle={modalTitle}
            modalContent={modalContent}
            icon={withoutIcon ? undefined : icon}
            {...props}
            iconProps={{ ...props.iconProps, color: 'error', variant: 'contained' }}
        />
    );
};

export default DeleteButton;

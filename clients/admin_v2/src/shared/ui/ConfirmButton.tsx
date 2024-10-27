import {
    Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, IconButtonProps,
} from "@mui/material";
import { FC, useState } from "react";

export interface ConfirmButtonProps {
    onAgree: () => void
    buttonTitle: string
    modalTitle: JSX.Element
    icon?: FC
    iconProps?: IconButtonProps | ButtonProps
    modalContent?: React.ReactNode
}

const ConfirmButton = ({
    icon: Icon, onAgree, buttonTitle, iconProps, modalTitle, modalContent,
}: ConfirmButtonProps) => {
    const [isModalOpen, setModalOpen] = useState(false);

    function close() {
        setModalOpen(false)
    }

    function agree() {
        onAgree();
        setModalOpen(false);
    }

    return (
        <>
            {Icon
                ? (
                    <IconButton
                        title={buttonTitle}
                        aria-label="delete"
                        onClick={() => setModalOpen(true)}
                        {...iconProps as IconButtonProps}
                    >
                        <Icon />
                    </IconButton>
                )
                : (
                    <Button onClick={() => setModalOpen(true)} {...iconProps as ButtonProps}>
                        {buttonTitle}
                    </Button>
                )
            }
            <Dialog
                open={isModalOpen}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-description" align="center">{modalTitle}</DialogTitle>
                {
                    modalContent
                    && (
                        <DialogContent sx={{ textAlign: 'center' }}>{modalContent}</DialogContent>
                    )
                }
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={agree} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmButton;

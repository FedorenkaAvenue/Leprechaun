import { Button, ButtonProps, Dialog, DialogActions, DialogTitle, IconButton, IconButtonProps } from "@mui/material";
import { FC, useState } from "react";

interface Props {
    icon: FC | undefined
    onAgree: () => void
    buttonTitle: string
    modalTitle: JSX.Element
    iconProps: IconButtonProps | ButtonProps
}

const ConfirmButton = ({ icon: Icon, onAgree, buttonTitle, iconProps, modalTitle }: Props) => {
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
                <DialogTitle id="alert-dialog-description">{modalTitle}</DialogTitle>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={agree} autoFocus>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmButton;

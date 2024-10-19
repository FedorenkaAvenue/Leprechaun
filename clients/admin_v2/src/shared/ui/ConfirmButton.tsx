import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { FC, useState } from "react";

interface Props {
    icon: FC
    onAgree: () => void
    buttonTitle: string
    modalTitle: JSX.Element
    iconProps: IconButtonProps
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
            <IconButton
                title={buttonTitle}
                aria-label="delete"
                onClick={() => setModalOpen(true)}
                {...iconProps}
            >
                <Icon />
            </IconButton>
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

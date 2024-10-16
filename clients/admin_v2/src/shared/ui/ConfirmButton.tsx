import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useState } from "react";

interface Props {
    icon: any
    onAgree: () => void
    title?: string
    iconProps: IconButtonProps
}

const ConfirmButton = ({ icon, onAgree, title, iconProps }: Props) => {
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
            <IconButton aria-label="delete" onClick={() => setModalOpen(true)} {...iconProps} >
                {icon}
            </IconButton>
            <Dialog
                open={isModalOpen}
                onClose={close}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm action</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{title}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Disagree</Button>
                    <Button onClick={agree} autoFocus>Agree</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ConfirmButton;

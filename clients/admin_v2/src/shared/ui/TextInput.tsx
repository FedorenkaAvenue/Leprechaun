import TextField, { TextFieldProps } from "@mui/material/TextField";
import { forwardRef } from "react";

type Props = {
    error?: string
    r?: boolean
} & Omit<TextFieldProps, 'error' | 'required'>;

const TextInput = forwardRef<HTMLInputElement, Props>(({ error, r, ...props }, ref) => {
    return (
        <TextField
            variant='outlined'
            ref={ref}
            required={r}
            error={Boolean(error)}
            helperText={error}
            {...props}
        />
    );
});

TextInput.displayName = 'TextInput';

export default TextInput;

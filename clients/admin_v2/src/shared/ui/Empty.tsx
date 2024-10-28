import { Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends TypographyProps {
    data: any | undefined
}

const Empty = ({ data, children, ...props }: PropsWithChildren<Props>) => {
    return Boolean(data)
        ? children
        : <Typography {...props}>🥶Empty</Typography>;
};

export default Empty;

import { ChipProps, Chip as MUIChip, Tooltip, TooltipProps } from "@mui/material"
import { ReactNode } from "react";
import { useNavigate } from "react-router";

interface Props extends ChipProps {
    tooltip?: ReactNode
    link?: string
    tooltipProps?: Omit<TooltipProps, 'title' | 'arrow' | 'children'>
};

const Chip = ({ color = 'primary', tooltip, link, tooltipProps, ...props }: Props) => {
    const nav = useNavigate();

    function navLink() {
        link && nav(link);
    }

    return (
        <Tooltip placement='right' title={tooltip} arrow onClick={navLink} {...tooltipProps}>
            <MUIChip sx={{ cursor: link ? 'pointer' : 'context-menu' }} color={color} {...props} />
        </Tooltip>
    );
};

export default Chip;

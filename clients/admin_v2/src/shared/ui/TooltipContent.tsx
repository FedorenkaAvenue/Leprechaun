import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface Props {
    content: JSX.Element
    title?: string | number
    active?: boolean
}

const TooltipContent = ({ content, title = 'show', active = true }: Props) => {
    return (
        active ? (
            <Tooltip placement='right' title={content} arrow>
                <Typography component='span' color='warning' className="cursor-context-menu">
                    {title}
                </Typography>
            </Tooltip>)
            : (
                <Typography component='span' color='textDisabled'>{title}</Typography>
            )
    );
};

export default TooltipContent;

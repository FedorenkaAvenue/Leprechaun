import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow, Typography } from "@mui/material";

import { CategoryPreviewModel } from "../model/CategoryPreview";
import CategoryTogglePublic from "@features/category/ui/CategoryTogglePublic";
import routerSubConfig from "@shared/config/router";
import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import Image from "@shared/ui/Image";

interface Props {
    category: CategoryPreviewModel
    renderTools?: () => ReactNode
}

const CategoryPreview = ({
    category: { id, url, title, is_public, comment, icon },
    renderTools,
}: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null)}
            </TableCell>
            <TableCell align="right">
                <Link to={`${routerSubConfig.categoryList.path}/${url}`}>
                    <Typography component='span' color='primary'>{url}</Typography>
                </Link>
            </TableCell>
            <TableCell align='center'>
                <div className="flex justify-end">
                    {icon
                        ? <Image src={icon} avatar />
                        : <Typography color='textDisabled'>no</Typography>
                    }
                </div>
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={title} />} />
            </TableCell>
            <TableCell align="right">
                <CategoryTogglePublic selected={is_public} />
            </TableCell>
            <TableCell align="right">{comment}</TableCell>
        </TableRow >
    );
};

export default CategoryPreview;

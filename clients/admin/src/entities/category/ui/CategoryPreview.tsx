import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { TableCell, TableRow, Typography } from "@mui/material";

import routerSubConfig from "@shared/config/router";
import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import Image from "@shared/ui/Image";
import { CategoryPreview } from "../model/interfaces";

interface Props {
    category: CategoryPreview
    renderTools?: (category: CategoryPreview) => ReactNode
    renderPublictStatus: (category: CategoryPreview) => ReactNode
}

const CategoryPreviewEntity = ({ category, renderTools, renderPublictStatus }: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{category.id}</TableCell>
            <TableCell align="left">
                {renderTools?.call(null, category)}
            </TableCell>
            <TableCell align="right">
                <Link to={`${routerSubConfig.categoryList.path}/${category.url}`}>
                    <Typography component='span' color='primary'>{category.url}</Typography>
                </Link>
            </TableCell>
            <TableCell align='center'>
                <div className="flex justify-end">
                    {category.icon
                        ? <Image src={category.icon} avatar />
                        : <Typography color='textDisabled'>no</Typography>
                    }
                </div>
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={category.title} />} />
            </TableCell>
            <TableCell align="right">
                {renderPublictStatus(category)}
            </TableCell>
            <TableCell align="right">
                {category.comment || <Typography component='span' color='textDisabled'>empty</Typography>}
            </TableCell>
        </TableRow >
    );
};

export default CategoryPreviewEntity;

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
    renderTools?: (category: CategoryPreviewModel) => ReactNode
}

const CategoryPreview = ({ category, renderTools }: Props) => {
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
                <CategoryTogglePublic selected={category.is_public} />
            </TableCell>
            <TableCell align="right">{category.comment}</TableCell>
        </TableRow >
    );
};

export default CategoryPreview;

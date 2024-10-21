import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

import { CategoryPreviewModel } from "../model/CategoryPreview";
import CategoryTogglePublic from "@features/category/ui/CategoryTogglePublic";
import routerSubConfig from "@shared/config/router";

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
                    <Typography color='primary'>{url}</Typography>
                </Link>
            </TableCell>
            <TableCell align="right">
                <ul>
                    <li>{title.en}</li>
                    <li>{title.ru}</li>
                    <li>{title.ua}</li>
                </ul>
            </TableCell>
            <TableCell align="right">
                <CategoryTogglePublic selected={is_public} />
            </TableCell>
            <TableCell align="right">{icon ? 'yes' : 'no'}</TableCell>
            <TableCell align="right">{comment}</TableCell>
        </TableRow >
    );
};

export default CategoryPreview;

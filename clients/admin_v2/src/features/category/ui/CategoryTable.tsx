import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

import CategoryPreview from "@entities/category/ui/CategoryPreview";
import { CategoryPreviewModel } from "@entities/category/model/CategoryPreview";

interface Props {
    categories: CategoryPreviewModel[] | undefined
    renderCategoryTools?: (category: CategoryPreviewModel) => ReactNode
}

const CategoryTableFeature = ({ categories, renderCategoryTools }: Props) => {
    return categories?.length
        ? (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Url</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Icon</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Is public</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.map(i => (
                            <CategoryPreview key={i.id} renderTools={renderCategoryTools} category={i} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        : <Typography align="center">There are no properties</Typography>
};

export default CategoryTableFeature;

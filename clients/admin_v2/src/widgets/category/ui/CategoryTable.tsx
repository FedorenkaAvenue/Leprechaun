import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router";
import Paper from "@mui/material/Paper";

import CategoryPreview from "@entities/category/ui/CategoryPreview";
import ContentListManager from "@shared/ui/ContentListManager";
import { useCategoryList } from "@entities/category/api/hooks";
import routerSubConfig from "@shared/config/router";
import CategoryDeleteButton from "@features/category/ui/CategoryDeleteButton";
import EditButton from "@shared/ui/EditButton";

const CategoryTableWidget = () => {
    const { data, isFetching } = useCategoryList();
    const nav = useNavigate();

    return (
        <div>
            <ContentListManager
                searchhandle={val => console.log(val)}
                isLoading={isFetching}
                addItemHandle={() => nav(routerSubConfig.categoryCreate.path)}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Url</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Is public</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Icon</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map(i => (
                                <CategoryPreview
                                    key={i.id}
                                    renderTools={() => (
                                        <>
                                            <CategoryDeleteButton categoryId={i.id} categoryUrl={i.url} />
                                            <EditButton handleClick={() => alert("Хуя")} title="Edit category" />
                                        </>
                                    )}
                                    category={i}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentListManager>
        </div>
    );
};

export default CategoryTableWidget;

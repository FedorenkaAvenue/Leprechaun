import { useNavigate } from "react-router";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import ContentListManager from "@shared/ui/ContentListManager";
import routerSubConfig from "@shared/config/router";
import CategoryDeleteButton from "@features/category/ui/CategoryDeleteButton";
import EditButton from "@shared/ui/EditButton";
import Empty from "@shared/ui/Empty";
import CategoryPreview from "@entities/category/ui/CategoryPreview";
import CategoryTogglePublic from "@features/category/ui/CategoryTogglePublic";
import { useCategoryList } from "@entities/category/model/hooks";

const CategoryTablePage = () => {
    const { data, isFetching } = useCategoryList();
    const nav = useNavigate();

    return (
        <div>
            <ContentListManager
                searchHandle={val => console.log(val)}
                isLoading={isFetching}
                addItemHandle={() => nav(routerSubConfig.categoryCreate.path)}
            >
                <Empty data={data?.length} align="center">
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
                                {data?.map(i => (
                                    <CategoryPreview
                                        category={i}
                                        key={i.id}
                                        renderTools={category => (
                                            <>
                                                <CategoryDeleteButton categoryId={category.id} categoryUrl={category.url} />
                                                <EditButton handleClick={() => alert("Хуя")} title="Edit category" />
                                            </>
                                        )}
                                        renderPublictStatus={category => (
                                            <CategoryTogglePublic selected={category.is_public} />
                                        )}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Empty>
            </ContentListManager>
        </div>
    );
};

export default CategoryTablePage;

import { useNavigate } from "react-router";

import ContentListManager from "@shared/ui/ContentListManager";
import { useCategoryList } from "@entities/category/api/hooks";
import routerSubConfig from "@shared/config/router";
import CategoryDeleteButton from "@features/category/ui/CategoryDeleteButton";
import EditButton from "@shared/ui/EditButton";
import CategoryTableFeature from "@features/category/ui/CategoryTable";

const CategoryTableWidget = () => {
    const { data, isFetching } = useCategoryList();
    const nav = useNavigate();

    return (
        <div>
            <ContentListManager
                searchHandle={val => console.log(val)}
                isLoading={isFetching}
                addItemHandle={() => nav(routerSubConfig.categoryCreate.path)}
            >
                <CategoryTableFeature
                    categories={data}
                    renderCategoryTools={category => (
                        <>
                            <CategoryDeleteButton categoryId={category.id} categoryUrl={category.url} />
                            <EditButton handleClick={() => alert("Хуя")} title="Edit category" />
                        </>
                    )}
                />
            </ContentListManager>
        </div>
    );
};

export default CategoryTableWidget;

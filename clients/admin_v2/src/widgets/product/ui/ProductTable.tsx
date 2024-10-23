import { useNavigate } from "react-router-dom";

import routerSubConfig from "@shared/config/router";
import ContentListManager from "@shared/ui/ContentListManager"

const ProductTableWidget = () => {
    const nav = useNavigate();

    return (
        <ContentListManager
            addItemHandle={() => nav(routerSubConfig.productCreate.path)}
            isLoading={true}
            searchhandle={(val) => alert(val)}
        >
            products
        </ContentListManager>
    );
};

export default ProductTableWidget;

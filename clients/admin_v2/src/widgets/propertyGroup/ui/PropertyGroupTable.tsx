import { useNavigate } from "react-router-dom";

import { CREATE_SEGMENT } from "@shared/constants/routerSegments";
import ContentListManager from "@shared/ui/ContentListManager";
import { usePropertyGroupList } from "@entities/propertyGroup/api/hooks";
import PropertyGroupDeleteButton from "@features/propertyGroup/ui/PropertyGroupDeleteButton";
import EditButton from "@shared/ui/EditButton";
import PropertyGroupTableFeature from "@features/propertyGroup/ui/PropertyGroupTable";

const PropertyGroupTableWidget = () => {
    const nav = useNavigate();
    const { data, isFetching } = usePropertyGroupList();

    return (
        <ContentListManager
            searchHandle={val => alert(val)}
            isLoading={isFetching}
            addItemHandle={() => nav(CREATE_SEGMENT)}
        >
            <PropertyGroupTableFeature
                groups={data}
                renderGroupTools={group => (
                    <>
                        <PropertyGroupDeleteButton group={group} />
                        <EditButton handleClick={() => alert("Хуя")} title="Edit property group" />
                    </>
                )}
            />
        </ContentListManager>
    );
};

export default PropertyGroupTableWidget;

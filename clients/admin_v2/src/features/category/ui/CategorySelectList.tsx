import { forwardRef, ReactNode, useMemo } from "react";

import { useCategoryList } from "@entities/category/api/hooks";
import mapToOptions from "@entities/category/lib/mapToOptions";
import { CategoryModel } from "@entities/category/model/Category";
import Select, { CustomSelectProps } from "@shared/ui/Select";

type Props = {
    value: CategoryModel['id'] | undefined
} & Omit<CustomSelectProps, 'options' | 'label'>;

const CategorySelectList = forwardRef<ReactNode, Props>(({ value = '', ...props }, ref) => {
    const { data, isFetching } = useCategoryList();
    const mapedOptions = useMemo(() => mapToOptions(data || []), [data]);

    return (
        <Select
            {...props}
            ref={ref}
            label="Select category"
            isLoading={isFetching}
            value={value}
            options={mapedOptions}
        />
    );
});

CategorySelectList.displayName = 'CategorySelectList';

export default CategorySelectList;

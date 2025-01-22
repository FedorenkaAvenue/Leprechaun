import { forwardRef, ReactNode, useMemo } from "react";

import mapToOptions from "@entities/category/lib/mapToOptions";
import Select, { CustomSelectProps } from "@shared/ui/Select";
import { Category } from "@entities/category/model/interfaces";
import { useCategoryList } from "@entities/category/model/hooks";

type Props = {
    value: Category['id'] | undefined
} & Omit<CustomSelectProps, 'options' | 'label'>;

const CategorySelectList = forwardRef<ReactNode, Props>(({ value = '', ...props }, ref) => {
    const { data, isFetching } = useCategoryList();
    const mapedOptions = useMemo(() => mapToOptions(data || [], 'en'), [data]);

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

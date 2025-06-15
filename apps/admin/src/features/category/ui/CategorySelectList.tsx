import { forwardRef, ReactNode, useMemo } from "react";

import mapToOptions from "@entities/category/lib/mapToOptions";
import Select, { CustomSelectProps } from "@shared/ui/Select";
import { useCategoryList } from "@entities/category/model/hooks";
import { Option } from "@shared/models/interfaces";
import { Category } from "@gen/category";

type Props = {
    value: Category['id'] | undefined
} & Omit<CustomSelectProps, 'options' | 'label'>;

const CategorySelectList = forwardRef<ReactNode, Props>(({ value = '', ...props }, ref) => {
    const { data, isFetching } = useCategoryList();
    const mapedOptions: Option[] = useMemo(() => mapToOptions(data || [], 'en'), [data]);

    return (
        <Select
            {...props}
            ref={ref}
            label="Select category"
            isLoading={isFetching}
            value={value}
            options={mapedOptions}
            withNone
        />
    );
});

CategorySelectList.displayName = 'CategorySelectList';

export default CategorySelectList;

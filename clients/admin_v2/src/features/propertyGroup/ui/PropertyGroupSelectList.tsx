import { forwardRef, ReactNode, useMemo } from "react";

import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import Select, { CustomSelectProps } from "@shared/ui/Select";
import mapToOptions from "@entities/propertyGroup/lib/mapToOptions";
import { usePropertyGroupList } from "@entities/propertyGroup/api/hooks";

type Props = {
    value: PropertyGroupModel['id'][] | undefined
} & Omit<CustomSelectProps, 'options' | 'label' | 'multiple'>;

const PropertyGroupSelectList = forwardRef<ReactNode, Props>(({ value = '', ...props }, ref) => {
    const { data, isFetching } = usePropertyGroupList();
    const mapedOptions = useMemo(() => mapToOptions(data || []), [data]);

    return (
        <Select
            ref={ref}
            value={value}
            options={mapedOptions}
            label="Select prop group"
            isLoading={isFetching}
            multiple
            {...props}
        />
    );
});

PropertyGroupSelectList.displayName = 'PropertyGroupSelectList';

export default PropertyGroupSelectList;

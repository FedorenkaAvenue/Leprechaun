import mapPropertyListToOptions from "@entities/property/lib/mapToOptions";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";
import Select, { CustomSelectProps } from "@shared/ui/Select";

type Props = {
    propertyGroup: PropertyGroupPreview
    isLoading?: boolean
} & Omit<CustomSelectProps, 'options' | 'multiple'>;

const PropertySelectList = ({ propertyGroup, ...props }: Props) => {
    const mapedPropertyList = mapPropertyListToOptions(propertyGroup.properties);

    return (
        <Select multiple options={mapedPropertyList} {...props} />
    );
};

export default PropertySelectList;

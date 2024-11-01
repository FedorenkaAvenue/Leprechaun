import mapPropertyListToOptions from "@entities/property/lib/mapToOptions";
import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import Select, { CustomSelectProps } from "@shared/ui/Select";

type Props = {
    propertyGroup: PropertyGroupPreviewModel
    isLoading?: boolean
} & Omit<CustomSelectProps, 'options' | 'multiple'>;

const PropertySelectList = ({ propertyGroup, ...props }: Props) => {
    const mapedPropertyList = mapPropertyListToOptions(propertyGroup.properties);

    return (
        <Select multiple options={mapedPropertyList} {...props} />
    );
};

export default PropertySelectList;

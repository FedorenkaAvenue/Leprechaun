import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton from "@shared/ui/ConfirmButton";
import { PropertyGroupPreview } from "@entities/propertyGroup/model/interfaces";
import { Property } from "@entities/property/model/interfaces";
import { useDeleteProperty } from "../models/hook";

interface Props {
    groupId: PropertyGroupPreview['id']
    property: Property
    icon?: FC
}

const PropertyDeleteButton = ({ groupId, property, icon = DeleteIcon }: Props) => {
    const { mutate } = useDeleteProperty(groupId);
    const modalTitle = (<>Confirm deleting <b>{property.alt_name}</b> property?</>);

    return (
        <ConfirmButton
            buttonTitle="Delete property"
            modalTitle={modalTitle}
            icon={icon}
            onAgree={() => mutate(property.id)}
            iconProps={{ color: 'error' }}
        />
    );
};

export default PropertyDeleteButton;

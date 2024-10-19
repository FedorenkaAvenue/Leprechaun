import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import PropertyModel from "@entities/property/model/Property";
import ConfirmButton from "@shared/ui/ConfirmButton";
import { useDeleteProperty } from "../api/hook";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";

interface Props {
    groupId: PropertyGroupModel['id']
    property: PropertyModel
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

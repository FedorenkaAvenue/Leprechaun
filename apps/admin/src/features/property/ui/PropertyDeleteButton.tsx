import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton from "@shared/ui/ConfirmButton";
import { useRemoveProperty } from "../models/hook";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { Property } from "@gen/_property";
import { PropertyGroup } from "@gen/property_group";
import { UserRole } from "@gen/user";

interface Props {
    property: Property
    propertyGroupId: PropertyGroup['id']
    icon?: FC
}

const PropertyDeleteButton = ({ property, propertyGroupId, icon = DeleteIcon }: Props) => {
    const [mutate] = useRemoveProperty();
    const modalTitle = (<>Confirm deleting <b>{property.altName}</b> property?</>);

    const remove = () => {
        mutate({ propertyId: property.id, propertyGroupId });
    }

    return (
        <ConfirmButton
            buttonTitle="Delete property"
            modalTitle={modalTitle}
            icon={icon}
            onAgree={remove}
            iconProps={{ color: 'error' }}
        />
    );
};

export default withRoleGuardComponent(PropertyDeleteButton, UserRole.ADMIN);

import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton from "@shared/ui/ConfirmButton";
import { Property } from "@entities/property/model/interfaces";
import { useRemoveProperty } from "../models/hook";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { UserRole } from "@entities/user/model/enums";
import { PropertyGroup } from "@entities/propertyGroup/model/interfaces";

interface Props {
    property: Property
    propertyGroupId: PropertyGroup['id']
    icon?: FC
}

const PropertyDeleteButton = ({ property, propertyGroupId, icon = DeleteIcon }: Props) => {
    const [mutate] = useRemoveProperty();
    const modalTitle = (<>Confirm deleting <b>{property.alt_name}</b> property?</>);

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

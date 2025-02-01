import { FC } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import ConfirmButton from "@shared/ui/ConfirmButton";
import { Property } from "@entities/property/model/interfaces";
import { useRemoveProperty } from "../models/hook";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { UserRole } from "@entities/user/model/enums";

interface Props {
    property: Property
    icon?: FC
}

const PropertyDeleteButton = ({ property, icon = DeleteIcon }: Props) => {
    const [mutate] = useRemoveProperty();
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

export default withRoleGuardComponent(PropertyDeleteButton, UserRole.ADMIN);

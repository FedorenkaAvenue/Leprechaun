import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';

import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import ConfirmButton from "@shared/ui/ConfirmButton";
import { useDeletePropertyGroup } from '../api/hooks';

interface Props {
    group: PropertyGroupModel
    icon?: FC
}

const PropertyGroupDeleteButton = ({ group, icon = DeleteIcon }: Props) => {
    const { mutate } = useDeletePropertyGroup(group.id);
    const modalTitle = (<>Confirm deleting <b>{group.alt_name}</b> property group?</>);

    return (
        <ConfirmButton
            buttonTitle="Delete group"
            modalTitle={modalTitle}
            icon={icon}
            onAgree={mutate}
            iconProps={{ color: 'error' }}
        />
    );
};

export default PropertyGroupDeleteButton;

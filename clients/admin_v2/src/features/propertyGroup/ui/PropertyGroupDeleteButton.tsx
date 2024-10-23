import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroup";
import { useDeletePropertyGroup } from '../api/hooks';
import DeleteButton, { SharedProps as DeleteButtonProps } from '@shared/ui/DeleteButton';

interface Props extends DeleteButtonProps {
    group: PropertyGroupModel | undefined
}

const PropertyGroupDeleteButton = (props: Props) => {
    const { mutate } = useDeletePropertyGroup(props.group?.id, props.removeCallback);
    const modalTitle = (<>Confirm deleting <b>{props.group?.alt_name}</b> property group?</>);

    return (
        <DeleteButton
            handleAgree={mutate}
            modalTitle={modalTitle}
            buttonTitle='Delete group'
            {...props}
        />
    );
};

export default PropertyGroupDeleteButton;

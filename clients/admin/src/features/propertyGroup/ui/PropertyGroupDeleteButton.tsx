import PropertyGroupPreviewModel from "@entities/propertyGroup/model/PropertyGroup";
import { useDeletePropertyGroup } from '../api/hooks';
import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { CircularProgress } from "@mui/material";
import { usePropertyGroup } from "@entities/propertyGroup/api/hooks";
import PropertyGroupModel from "@entities/propertyGroup/model/PropertyGroupPreview";

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalTitle' | 'handleAgree' | 'onAgree'> {
    group: PropertyGroupPreviewModel | undefined
    removeCallback?: () => void
}

function ModalContent({ id }: { id: PropertyGroupModel['id'] | undefined }) {
    const { data, isFetching } = usePropertyGroup(id);
    const categoriesLen = data?.categories.length;
    const propertiesLen = data?.properties.length;

    if (!categoriesLen || !propertiesLen) return null;

    return isFetching
        ? <CircularProgress />
        : <>
            ⚠️Property group uses by {categoriesLen} categories and has {propertiesLen} properties.
            <br />
            All properties will be removed.
        </>;
}

const PropertyGroupDeleteButton = (props: Props) => {
    const { mutate } = useDeletePropertyGroup(props.group?.id, props.removeCallback);

    return (
        <DeleteButton
            onAgree={mutate}
            modalTitle={(<>Confirm deleting <b>{props.group?.alt_name}</b> property group?</>)}
            modalContent={<ModalContent id={props.group?.id} />}
            buttonTitle='Delete group'
            {...props}
        />
    );
};

export default PropertyGroupDeleteButton;

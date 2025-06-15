import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { CircularProgress } from "@mui/material";
import { usePropertyGroup } from '@entities/propertyGroup/model/hooks';
import { useRemovePropertyGroup } from '../models/hooks';
import withRoleGuardComponent from '@shared/hocs/withRoleGuardComponent';
import { PropertyGroup, PropertyGroupPreview } from '@gen/property_group';
import { UserRole } from '@gen/user';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalTitle' | 'handleAgree' | 'onAgree'> {
    group: PropertyGroupPreview
    removeCallback?: () => void
}

function ModalContent({ id }: { id: PropertyGroup['id'] }) {
    const { data, isFetching } = usePropertyGroup(id);
    const categoriesLen = data?.categories.length;
    const propertiesLen = data?.properties.length;

    if (!categoriesLen && !propertiesLen) return null;

    return isFetching
        ? <CircularProgress />
        : <>
            ⚠️Property group uses by {categoriesLen} categories and has {propertiesLen} properties.
            <br />
            All properties will be removed.
        </>;
}

const PropertyGroupDeleteButton = (props: Props) => {
    const [mutate] = useRemovePropertyGroup();

    const remove = () => {
        mutate({ id: props.group.id, successCallback: props.removeCallback });
    }

    return (
        <DeleteButton
            onAgree={remove}
            modalTitle={(<>Confirm deleting <b>{props.group?.altName}</b> property group?</>)}
            modalContent={<ModalContent id={props.group?.id} />}
            buttonTitle='Delete group'
            {...props}
        />
    );
};

export default withRoleGuardComponent(PropertyGroupDeleteButton, UserRole.ADMIN);

import { CircularProgress, DialogContentText } from '@mui/material';

import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { Product } from '@entities/product/model/interfaces';
import { useProduct } from '@entities/product/model/hooks';
import { useRemoveProduct } from '../model/hook';
import withRoleGuardComponent from '@shared/hocs/withRoleGuardComponent';
import { UserRole } from '@entities/user/model/enums';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalTitle' | 'handleAgree' | 'onAgree'> {
    productId: Product['id']
}

function ModalContent({ id }: { id: Product['id'] }) {
    const { isFetching } = useProduct(id);

    return isFetching
        ? <CircularProgress />
        : <DialogContentText>⚠️d</DialogContentText>;
}

const ProductDeleteButton = ({ productId, ...props }: Props) => {
    const [mutate] = useRemoveProduct();

    return (
        <DeleteButton
            onAgree={() => mutate(productId)}
            modalTitle={(<>Confirm deleting <b>{productId}</b> product?</>)}
            modalContent={<ModalContent id={productId} />}
            buttonTitle='Delete product'
            {...props}
        />
    );
};

export default withRoleGuardComponent(ProductDeleteButton, UserRole.ADMIN);

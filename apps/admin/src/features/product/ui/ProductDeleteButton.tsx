import { CircularProgress, DialogContentText } from '@mui/material';

import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { useProduct } from '@entities/product/model/hooks';
import { useRemoveProduct } from '../model/hook';
import withRoleGuardComponent from '@shared/hocs/withRoleGuardComponent';
import { useNavigate } from 'react-router';
import routerSubConfig from '@shared/config/router';
import { Product } from '@gen/product';
import { UserRole } from '@gen/user';

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
    const navigate = useNavigate();
    const [mutate] = useRemoveProduct();

    function remove() {
        mutate({
            productId,
            successCallback: () => navigate(routerSubConfig.productList.path),
        });
    }

    return (
        <DeleteButton
            onAgree={remove}
            modalTitle={(<>Confirm deleting <b>{productId}</b> product?</>)}
            modalContent={<ModalContent id={productId} />}
            buttonTitle='Delete product'
            {...props}
        />
    );
};

export default withRoleGuardComponent(ProductDeleteButton, UserRole.ADMIN);

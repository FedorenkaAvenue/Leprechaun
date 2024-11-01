import { ProductModel } from '@entities/product/model/Product';
import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { useRemoveProduct } from '../api/hook';
import { useProduct } from '@entities/product/api/hooks';
import { CircularProgress, DialogContentText } from '@mui/material';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalTitle' | 'handleAgree' | 'onAgree'> {
    productID: ProductModel['id'] | undefined
}

function ModalContent({ id }: { id: ProductModel['id'] | undefined }) {
    const { data, isFetching } = useProduct(id);

    // if (!productsLen) return null;

    return isFetching
        ? <CircularProgress />
        : <DialogContentText>⚠️d</DialogContentText>;
}

const ProductDeleteButton = ({ productID, ...props }: Props) => {
    const { mutate } = useRemoveProduct(productID);

    return (
        <DeleteButton
            onAgree={mutate}
            modalTitle={(<>Confirm deleting <b>{productID}</b> product?</>)}
            modalContent={<ModalContent id={productID} />}
            buttonTitle='Delete product'
            {...props}
        />
    );
};

export default ProductDeleteButton;

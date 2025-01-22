import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { CircularProgress, DialogContentText } from '@mui/material';
import { Product } from '@entities/product/model/interfaces';
import { useProduct } from '@entities/product/model/hooks';
import { useRemoveProduct } from '../model/hook';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalTitle' | 'handleAgree' | 'onAgree'> {
    productID: Product['id'] | undefined
}

function ModalContent({ id }: { id: Product['id'] | undefined }) {
    const { isFetching } = useProduct(id);

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

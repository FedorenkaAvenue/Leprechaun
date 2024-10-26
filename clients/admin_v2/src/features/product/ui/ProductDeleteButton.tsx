import { ProductModel } from '@entities/product/model/Product';
import DeleteButton, { SharedProps as DeleteButtonProps } from '@shared/ui/DeleteButton';
import { useRemoveProduct } from '../api/hook';

interface Props extends DeleteButtonProps {
    productID: ProductModel['id'] | undefined
}

const ProductDeleteButton = ({ productID, ...props }: Props) => {
    const { mutate } = useRemoveProduct(productID);
    const modalTitle = (<>Confirm deleting <b>{productID}</b> product?</>);

    return (
        <DeleteButton
            handleAgree={mutate}
            modalTitle={modalTitle}
            buttonTitle='Delete product'
            {...props}
        />
    );
};

export default ProductDeleteButton;

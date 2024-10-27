import { CircularProgress, DialogContentText } from '@mui/material';

import { useCategory } from '@entities/category/api/hooks';
import { useRemoveCategory } from '../api/hooks';
import { CategoryModel } from '@entities/category/model/Category';
import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalContent' | 'handleAgree' | 'modalTitle' | 'onAgree'> {
    categoryId: CategoryModel['id'] | undefined
    categoryUrl: CategoryModel['url'] | undefined
    removeCallback?: () => void
}

function ModalContent({ url }: { url: CategoryModel['url'] | undefined }) {
    const { data, isFetching } = useCategory(url);
    const productsLen = data?.products.length;

    if (!productsLen) return null;

    return isFetching
        ? <CircularProgress />
        : <DialogContentText>⚠️Category has {productsLen} products. All these products will be removed</DialogContentText>;
}

const CategoryDeleteButton = ({ categoryId, categoryUrl, ...props }: Props) => {
    const { mutate } = useRemoveCategory(categoryId, props.removeCallback);

    return (
        <DeleteButton
            modalTitle={(<>Confirm deleting <b>{categoryUrl}</b> category?</>)}
            modalContent={<ModalContent url={categoryUrl} />}
            buttonTitle='Delete category'
            onAgree={mutate}
            {...props}
        />
    );
};

export default CategoryDeleteButton;

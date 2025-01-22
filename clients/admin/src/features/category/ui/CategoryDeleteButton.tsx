import { CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import routerSubConfig from '@shared/config/router';
import { PRODUCT_LIST_URL_QUERY_PARAMS } from '@features/product/constants/urlQueryParams';
import { Category } from '@entities/category/model/interfaces';
import { useCategory } from '@entities/category/model/hooks';
import { useRemoveCategory } from '../model/hooks';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalContent' | 'handleAgree' | 'modalTitle' | 'onAgree'> {
    categoryId: Category['id']
    categoryUrl: Category['url'] | undefined
    removeCallback?: () => void
}

function ModalContent({ url }: { url: Category['url'] | undefined }) {
    const { data, isFetching } = useCategory(url);
    const productsLen = data?.products.length;

    if (!productsLen) return null;

    return isFetching
        ? <CircularProgress />
        : (
            <>
                ⚠️Category has&nbsp;
                <Link to={`${routerSubConfig.productList.path}?${PRODUCT_LIST_URL_QUERY_PARAMS.category}=${data?.id}`}>
                    <Typography color='primary' component='span'>{productsLen} products</Typography>
                </Link>.
                <br />
                All these products will be removed.</>
        );
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

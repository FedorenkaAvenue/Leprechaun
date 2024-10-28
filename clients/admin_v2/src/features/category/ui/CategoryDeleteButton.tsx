import { CircularProgress, Typography } from '@mui/material';

import { useCategory } from '@entities/category/api/hooks';
import { useRemoveCategory } from '../api/hooks';
import { CategoryModel } from '@entities/category/model/Category';
import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import { Link } from 'react-router-dom';
import routerSubConfig from '@shared/config/router';
import URL_QUERY_PARAMS from '@shared/constants/urlQueryParams';

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
        : (
            <>
                ⚠️Category has&nbsp;
                <Link to={`${routerSubConfig.productList.path}?${URL_QUERY_PARAMS.category}=${data?.id}`}>
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

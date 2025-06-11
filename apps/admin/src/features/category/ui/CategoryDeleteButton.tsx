import { CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router';
import { FC } from 'react';

import DeleteButton, { DeleteButtonProps } from '@shared/ui/DeleteButton';
import routerSubConfig from '@shared/config/router';
import { PRODUCT_LIST_URL_QUERY_PARAMS } from '@features/product/constants/urlQueryParams';
import { Category } from '@entities/category/model/interfaces';
import { useCategory } from '@entities/category/model/hooks';
import { useRemoveCategory } from '../model/hooks';
import withRoleGuardComponent from '@shared/hocs/withRoleGuardComponent';
import { UserRole } from '@entities/user/model/enums';

interface Props extends Omit<DeleteButtonProps, 'buttonTitle' | 'modalContent' | 'handleAgree' | 'modalTitle' | 'onAgree'> {
    categoryId: Category['id']
    categoryUrl: Category['url']
    removeCallback?: () => void
}

function ModalContent({ url }: { url: Category['url'] }) {
    const { data, isFetching } = useCategory(url);
    const productsLen = data?.products?.length;

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

const CategoryDeleteButton: FC<Props> = ({ categoryId, categoryUrl, ...props }) => {
    const [mutate] = useRemoveCategory();

    const remove = () => {
        mutate({ id: categoryId, removeCallback: props.removeCallback })
    }

    return (
        <DeleteButton
            modalTitle={(<>Confirm deleting <b>{categoryUrl}</b> category?</>)}
            modalContent={<ModalContent url={categoryUrl} />}
            buttonTitle='Delete category'
            onAgree={remove}
            {...props}
        />
    );
};

export default withRoleGuardComponent<Props>(CategoryDeleteButton, UserRole.ADMIN);

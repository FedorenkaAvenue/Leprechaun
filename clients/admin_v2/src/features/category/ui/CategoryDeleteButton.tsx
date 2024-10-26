import { useRemoveCategory } from '../api/hooks';
import { CategoryModel } from '@entities/category/model/Category';
import DeleteButton, { SharedProps as DeleteButtonProps } from '@shared/ui/DeleteButton';

interface Props extends DeleteButtonProps {
    categoryId: CategoryModel['id'] | undefined
    categoryUrl: CategoryModel['url'] | undefined
}

const CategoryDeleteButton = ({ categoryId, categoryUrl, ...props }: Props) => {
    const { mutate } = useRemoveCategory(categoryId, props.removeCallback);
    const modalTitle = (<>Confirm deleting <b>{categoryUrl}</b> category?</>);

    return (
        <DeleteButton
            handleAgree={mutate}
            modalTitle={modalTitle}
            buttonTitle='Delete category'
            {...props}
        />
    );
};

export default CategoryDeleteButton;

import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';

import ConfirmButton from "@shared/ui/ConfirmButton";
import { CategoryModel } from '@entities/category/model/Category';
import { useRemoveCategory } from '../api/hooks';

interface Props {
    category: CategoryModel
    icon?: FC
}

const CategoryDeleteButton = ({ category, icon = DeleteIcon }: Props) => {
    const { mutate } = useRemoveCategory(category.id);
    const modalTitle = (<>Confirm deleting <b>{category.url}</b> category?</>);

    return (
        <ConfirmButton
            buttonTitle="Delete category"
            modalTitle={modalTitle}
            icon={icon}
            onAgree={mutate}
            iconProps={{ color: 'error' }}
        />
    );
};

export default CategoryDeleteButton;

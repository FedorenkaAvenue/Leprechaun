import Switch from "@mui/material/Switch";
import { FC } from "react";

import { useUpdateCategory } from "../model/hooks";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { Category } from "@gen/category";
import { UserRole } from "@gen/user";

interface Props {
    categoryId: Category['id']
    selected: boolean
}

const CategoryTogglePublic: FC<Props> = ({ selected, categoryId }) => {
    const [mutate] = useUpdateCategory();

    const update = () => {
        mutate({ id: categoryId, updates: { isPublic: !selected } });
    }

    return <Switch onChange={update} checked={selected} />;
};

export default withRoleGuardComponent(CategoryTogglePublic, UserRole.ADMIN);

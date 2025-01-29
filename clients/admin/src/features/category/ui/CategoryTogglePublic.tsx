import Switch from "@mui/material/Switch";
import { FC } from "react";

import { Category } from "@entities/category/model/interfaces";
import { useUpdateCategory } from "../model/hooks";
import withRoleBlur from "@shared/hocs/withRoleBlur";
import { UserRole } from "@entities/user/model/enums";

interface Props {
    categoryId: Category['id']
    selected: boolean
}

const CategoryTogglePublic: FC<Props> = ({ selected, categoryId }) => {
    const [mutate] = useUpdateCategory();

    const update = () => {
        mutate({ id: categoryId, updates: { is_public: !selected } });
    }

    return <Switch onChange={update} checked={selected} />;
};

export default withRoleBlur(CategoryTogglePublic, UserRole.ADMIN);

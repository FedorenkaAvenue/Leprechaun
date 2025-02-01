import Switch from "@mui/material/Switch";

import { useUpdateProduct } from "../model/hook";
import { Product } from "@entities/product/model/interfaces";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { UserRole } from "@entities/user/model/enums";

interface Props {
    productId: Product['id']
    selected: boolean
}

const ProductTogglePublic = ({ selected, productId }: Props) => {
    const [mutate] = useUpdateProduct();

    const toggle = () => {
        mutate({ id: productId, updates: { is_public: !selected } });
    };

    return <Switch onChange={toggle} checked={selected} />;
};

export default withRoleGuardComponent(ProductTogglePublic, UserRole.ADMIN);

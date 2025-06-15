import Switch from "@mui/material/Switch";

import { useUpdateProduct } from "../model/hook";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { Product } from "@gen/product";
import { UserRole } from "@gen/user";

interface Props {
    productId: Product['id']
    selected: boolean
}

const ProductTogglePublic = ({ selected, productId }: Props) => {
    const [mutate] = useUpdateProduct();

    const toggle = () => {
        mutate({ id: productId, updates: { isPublic: !selected } });
    };

    return <Switch onChange={toggle} checked={selected} />;
};

export default withRoleGuardComponent(ProductTogglePublic, UserRole.ADMIN);

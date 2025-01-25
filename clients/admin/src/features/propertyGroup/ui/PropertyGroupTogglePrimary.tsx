import Switch from "@mui/material/Switch";
import { FC } from "react";

import { useUpdatePropertyGroup } from "../models/hooks";
import { PropertyGroup } from "@entities/propertyGroup/model/interfaces";

interface Props {
    groupId: PropertyGroup['id']
    selected: boolean
}

const PropertyGroupTogglePrimary: FC<Props> = ({ groupId, selected }) => {
    const [mutate] = useUpdatePropertyGroup();

    const update = () => {
        mutate({ id: groupId, updates: { is_primary: !selected } });
    }

    return <Switch onChange={update} checked={selected} />;
};

export default PropertyGroupTogglePrimary;

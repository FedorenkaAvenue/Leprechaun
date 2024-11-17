import Switch from "@mui/material/Switch";
import { FC } from "react";

interface Props {
    selected: boolean
}

const PropertyGroupTogglePrimary: FC<Props> = ({ selected }) => {
    return <Switch onChange={() => alert('Хуя')} checked={selected} />;
};

export default PropertyGroupTogglePrimary;

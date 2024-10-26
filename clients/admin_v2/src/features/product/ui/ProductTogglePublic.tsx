import Switch from "@mui/material/Switch";

interface Props {
    selected: boolean
}

const ProductTogglePublic = ({ selected }: Props) => {
    return <Switch onChange={() => alert('Хуя')} checked={selected} />;
};

export default ProductTogglePublic;

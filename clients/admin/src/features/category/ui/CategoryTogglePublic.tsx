import Switch from "@mui/material/Switch";

interface Props {
    selected: boolean
}

const CategoryTogglePublic = ({ selected }: Props) => {
    return <Switch onChange={() => alert('Хуя')} checked={selected} />;
};

export default CategoryTogglePublic;

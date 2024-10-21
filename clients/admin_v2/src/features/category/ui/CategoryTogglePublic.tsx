import Switch from "@mui/material/Switch";

interface Props {
    selected: boolean
}

const CategoryTogglePublic = ({ selected }: Props) => {
    return <Switch checked={selected} />;
};

export default CategoryTogglePublic;

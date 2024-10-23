import { Chip, Divider, Typography } from "@mui/material";
import { CategoryModel } from "../model/Category";
import { Link } from "react-router-dom";
import routerSubConfig from "@shared/config/router";

interface Props {
    category: CategoryModel | undefined
}

const Category = ({ category }: Props) => {
    return (
        <div className="flex flex-col flex-wrap gap-4">
            <div className="flex">
                <div className="flex-1">
                    <div className="p-2">id: <b>{category?.id}</b></div>
                    <div className="p-2">url: <b>{category?.url}</b></div>
                    <div className="p-2">icon: <b>{category?.icon ? 'yes' : 'no'}</b></div>
                    <div className="p-2">comment: <b>{category?.comment}</b></div>
                    <div className="p-2">is public: <b>{category?.is_public ? 'yes' : 'no'}</b></div>
                </div>
                <div className="flex-1">
                    title:
                    <ul>
                        <li><b>{category?.title.en}</b></li>
                        <li><b>{category?.title.ua}</b></li>
                        <li><b>{category?.title.ru}</b></li>
                    </ul>
                </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
                <Typography variant='h5'>Property groups</Typography>
                <ul className="flex gap-4">
                    {category?.propertygroups.map(i => (
                        <li key={i.id}>
                            <Link to={`${routerSubConfig.propertyGroupList.path}/${i.id}`}>
                                <Chip color='primary' label={i.alt_name} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Divider />
            <div className="flex flex-col gap-4">
                <Typography variant='h5'>Products</Typography>
                <div className="p-2">
                    products..
                </div>
            </div>
        </div>
    );
};

export default Category;

import { Box, Chip, Paper, Typography } from "@mui/material";
import { CategoryModel } from "../model/Category";
import { Link } from "react-router-dom";
import routerSubConfig from "@shared/config/router";

interface Props {
    category: CategoryModel | undefined
}

const Category = ({ category }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <Box>
                <Typography variant='h6'>Main</Typography>
                <Paper className="flex gap-2">
                    <div>
                        <div className="p-2">id: <b>{category?.id}</b></div>
                        <div className="p-2">url: <b>{category?.url}</b></div>
                        <div className="p-2">icon: <b>{category?.icon ? 'yes' : 'no'}</b></div>
                        <div className="p-2">comment: <b>{category?.comment}</b></div>
                        <div className="p-2">is public: <b>{category?.is_public ? 'yes' : 'no'}</b></div>
                    </div>
                    <div className="p-2">
                        title:
                        <ul>
                            <li><b>{category?.title.en}</b></li>
                            <li><b>{category?.title.ua}</b></li>
                            <li><b>{category?.title.ru}</b></li>
                        </ul>
                    </div>
                </Paper>
            </Box>
            <Box>
                <Typography variant='h6'>Property groups</Typography>
                <Paper className="p-2">
                    <ul className="flex gap-2">
                        {category?.propertygroups.map(i => (
                            <li>
                                <Link to={`${routerSubConfig.propertyGroupList.path}/${i.id}`}>
                                    <Chip color='primary' label={i.alt_name} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </Paper>
            </Box>
            <Box>
                <Typography variant='h6'>Products</Typography>
                <Paper className="p-2">
                    {/* <ul>
                        {category?.propertygroups.map(i => (
                            <li>{i.alt_name}</li>
                        ))}
                    </ul> */}
                </Paper>
            </Box>
        </div>
    );
};

export default Category;

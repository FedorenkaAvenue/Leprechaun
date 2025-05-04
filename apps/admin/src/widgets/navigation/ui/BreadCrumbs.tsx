import { Breadcrumbs, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import routerSubConfig from "@shared/config/router";

const BreadCrumbsWidget = () => {
    const { pathname } = useLocation();
    const slicedPath = pathname.split('/').slice(1);

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" to="/">
                <Typography color='primary'>Home</Typography>
            </Link>
            {slicedPath.map((p, i) => {
                const segment = Object.values(routerSubConfig).find(i => i.segment === p);

                return i === slicedPath.length - 1
                    ? <Typography key={i}>{segment?.title || p}</Typography>
                    : (
                        <Link key={i} color="inherit" to={slicedPath.slice(0, i + 1).join('/')}>
                            <Typography color='primary'>{segment?.title}</Typography>
                        </Link>
                    )
            })}
        </Breadcrumbs>
    );
};

export default BreadCrumbsWidget;

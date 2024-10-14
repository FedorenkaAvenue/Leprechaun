import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const BreadCrumbs = () => {
    const { pathname } = useLocation();
    const slicedPath = pathname.split('/').slice(1);

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" to="/">
                <Typography color='primary'>Home</Typography>
            </Link>
            {slicedPath.map((p, i) => (
                i === slicedPath.length - 1 ? (
                    <Typography key={i}>{p}</Typography>
                ) : (
                    <Link key={i} color="inherit" to={slicedPath.slice(0, i + 1).join('/')}>
                        <Typography color='primary'>{p}</Typography>
                    </Link>
                )
            ))}
        </Breadcrumbs>
    );
};

export default BreadCrumbs;

import { Typography } from "@mui/material";

function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <Typography variant='h1' color='error'>404</Typography>
            <Typography variant='h4' color='error'>Page not found</Typography>
            <img src="/static/404.gif" width='300' height='300' />
        </div>
    );
}

export default NotFoundPage;

import { Button, Paper, Typography } from "@mui/material";
import { resetServerCache as resetServerCacheAPI } from "../api";

const DashboardPage = () => {
    function resetServerCache() {
        resetServerCacheAPI()
    }

    return (
        <div>
            <Typography>Tools</Typography>
            <Paper sx={{ padding: '10px' }}>
                <Button variant='contained' onClick={resetServerCache}>Reset server cache</Button>
            </Paper>
        </div>
    );
};

export default DashboardPage;

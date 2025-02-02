import { Button } from "@mui/material";
import { resetServerCache as resetServerCacheAPI } from '../api/index';

const ToolsPage = () => {
    return (
        <div>
            <Button variant='contained' onClick={resetServerCacheAPI}>Reset server cache</Button>
        </div>
    );
};

export default ToolsPage;

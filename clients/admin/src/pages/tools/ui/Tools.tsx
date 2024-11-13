import { Button } from "@mui/material";
import { resetServerCache as resetServerCacheAPI } from '../api/index';

const ToolsPage = () => {
    function resetServerCache() {
        resetServerCacheAPI();
    }

    return (
        <div>
            <Button variant='contained' onClick={resetServerCache}>Reset server cache</Button>
        </div>
    );
};

export default ToolsPage;

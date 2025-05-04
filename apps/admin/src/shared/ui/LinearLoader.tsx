import { LinearProgress } from "@mui/material";

interface Props {
    isLoading: boolean
}

const LinearLoader = ({ isLoading }: Props) => {
    return <div className="h-2">{isLoading && <LinearProgress />}</div>;
};

export default LinearLoader;


import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const ViewPage: React.FC = () => {

    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state?.data;

    if (!data) return <Typography>No data available</Typography>;

    return (
        <div>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Typography variant="h4">Details</Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ViewPage;
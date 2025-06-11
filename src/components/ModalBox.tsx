
import { Box, Modal, Typography } from '@mui/material';
import { formatDate } from '../helpers/dateFormat';

const ModalBox: React.FC<ModalBoxProps> = ({ modalOpen, selectedRow, handleClose }) => {
    return (
        <Modal open={modalOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80vw',
                    maxWidth: 1000,
                    bgcolor: '#fff',
                    borderRadius: 4,
                    boxShadow: 24,
                    p: 5,
                    maxHeight: '90vh',
                    overflow: 'hidden',
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        mb: 4,
                        fontWeight: 600,
                        textAlign: 'center',
                        color: '#2c3e50',
                        borderBottom: '1px solid #ccc',
                        pb: 2,
                    }}
                >
                    Car Details
                </Typography>

                {selectedRow && (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: 3,
                        }}
                    >
                        <DetailItem label="Brand" value={selectedRow.Brand} />
                        <DetailItem label="Model" value={selectedRow.Model} />
                        <DetailItem label="Price" value={`€ ${selectedRow.PriceEuro}`} />
                        <DetailItem label="Seats" value={selectedRow.Seats} />
                        <DetailItem label="Range" value={selectedRow.Range_Km} />
                        <DetailItem label="Efficiency" value={selectedRow.Efficiency_WhKm} />
                        <DetailItem label="Fast Charge" value={selectedRow.FastCharge_KmH} />
                        <DetailItem label="Rapid Charge" value={selectedRow.RapidCharge} />
                        <DetailItem label="Power Train" value={selectedRow.PowerTrain} />
                        <DetailItem label="Plug Type" value={selectedRow.PlugType} />
                        <DetailItem label="Body Style" value={selectedRow.BodyStyle} />
                        <DetailItem label="Segment" value={selectedRow.Segment} />
                        <DetailItem label="Date" value={formatDate(selectedRow.Date)} />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

const DetailItem = ({ label, value }: { label: string; value: any }) => {
    const formattedValue =
        typeof value === 'boolean'
            ? value ? 'Yes' : 'No'
            : value ?? '-';

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ fontSize: "15px", color: 'text.secondary' }}>
                {label}
            </Typography>
            <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                {formattedValue}
            </Typography>
        </Box>
    );
};


interface ModalBoxProps {
    modalOpen: boolean;
    selectedRow: any;
    handleClose: () => void;
}


export default ModalBox;
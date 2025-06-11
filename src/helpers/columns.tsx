import { ColDef } from 'ag-grid-community';
import { formatDate } from '../helpers/dateFormat';

export const columnDefs: ColDef[] = [
    { headerName: "Brand", field: "Brand" },
    { headerName: "Model", field: "Model" },
    { headerName: "AccelSec", field: "AccelSec", width: 120 },
    { headerName: "TopSpeed (KmH)", field: "TopSpeed_KmH", width: 120 },
    { headerName: "Seats", field: "Seats", width: 120 },
    {
        headerName: "Price",
        field: "PriceEuro",
        valueFormatter: (params: any) => params.value ? "€ " + params.value : params.value,
        cellStyle: { textAlign: "left" }
    },
    {
        headerName: "Date",
        field: "Date",
        valueFormatter: (params: any) => params.value ? formatDate(params.value) : params.value,
        cellStyle: { textAlign: "left" }
    }
];

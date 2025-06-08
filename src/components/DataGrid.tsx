import React, { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { IconType } from 'react-icons';
import SearchBar from './SearchBar';


type Props = {
    rowData: any[];
    columnDefs: any[];
    onDelete: (id: string) => void;
};

const DataGrid: React.FC<Props> = ({ rowData, columnDefs, onDelete }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(rowData);
    const navigate = useNavigate();

    useEffect(() => {
        if (!searchText) {
            setFilteredData(rowData);
            return;
        }
        const filtered = rowData.filter((row) =>
            Object.values(row).some((value: any) =>
                value?.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [searchText, rowData]);

    const handleSearch = () => {
        const filtered = rowData.filter((row) =>
            Object.values(row).some((value: any) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
        );
        setFilteredData(filtered);
    };

    const handleEdit = (row: any) => {
        console.log("Edit clicked:", row);
        // navigate to edit if needed
    };

    const handleView = (row: any) => {
        console.log("handle ",row)
        navigate(`/view/${row.id}`, { state: { data: row } });
    };

    const handleDeleteClick = (row: any) => {
        onDelete(row.id);
    };

    const formatDate = (dateParams: any) => {
        const date = new Date(dateParams);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const columnDefs2: ColDef[] = [
        {
            headerName: "#",
            valueGetter: (params: any) => params.node.rowIndex + 1,
            width: 60,
            cellStyle: { textAlign: 'center' },
            pinned: 'left',
        },
        { headerName: "Brand", field: "Brand" },
        { headerName: "Model", field: "Model" },
        { headerName: "AccelSec", field: "AccelSec", width: 120 },
        { headerName: "TopSpeed (KmH)", field: "TopSpeed_KmH", width: 120 },
        // { headerName: "Range (Km)", field: "Range_Km", width: 120 },
        // { headerName: "Efficiency (WhKm)", field: "Efficiency_WhKm", width: 120 },
        // { headerName: "FastCharge (KmH)", field: "FastCharge_KmH", width: 120 },
        // { headerName: "Rapid Charge", field: "RapidCharge", width: 120 },
        // { headerName: "Power Train", field: "PowerTrain" },
        // { headerName: "Plug Type", field: "PlugType" },
        // { headerName: "Body Style", field: "BodyStyle" },
        // { headerName: "Segment", field: "Segment", width: 120 },
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
        },
        {
            field: 'action',
            headerName: 'Actions',
            cellRenderer: (params: any) => (
                <div>
                    <ActionIcon type="view" onClick={() => handleView(params.data)} />
                    <ActionIcon type="edit" onClick={() => console.log('Edit', params.data)} />
                    <ActionIcon type="delete" onClick={() => console.log('Delete', params.data)} />
                </div>
            )
        }
    ];



    return (
        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
            <Box sx={{ mb: 2 }}>
                <SearchBar
                    value={searchText}
                    onChange={setSearchText}
                    onSearch={handleSearch}
                />
            </Box>
            <AgGridReact
                rowData={filteredData}
                columnDefs={[...columnDefs2]}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight"
                rowHeight={50}
            />
        </div>
    );
};
interface IconProps {
    type: 'delete' | 'view' | 'edit';
    onClick: () => void;
}

const iconMap: Record<IconProps['type'], IconType> = {
    delete: FaTrash,
    view: FaEye,
    edit: FaEdit,
};

const ActionIcon: React.FC<IconProps> = ({ type, onClick }) => {
    const IconComponent = iconMap[type] as React.FC;

    return (
        <span
            onClick={onClick}
            style={{ cursor: 'pointer', margin: '5px', fontSize: '18px' }}
        >
            <IconComponent />
        </span>
    );
};

export default DataGrid;

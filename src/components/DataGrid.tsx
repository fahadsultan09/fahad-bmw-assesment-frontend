import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from './SearchBar';


const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, onDelete }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(rowData);


    const navigate = useNavigate();

    useEffect(() => {
        setFilteredData(rowData);
    }, [rowData]);

    const handleView = (row: any) => {
        navigate(`/view/${row.id}`, { state: { data: row } });
    };

    const handleEdit = (row: any) => {
        console.log('Edit clicked for:', row);
        // Or navigate to edit page
    };

    const handleDeleteClick = (row: any) => {
        onDelete(row.id);
    };


    const actionColumn = {
        headerName: 'Actions',
        field: 'actions',
        cellRendererFramework: (params: any) => (
            <Box>
                <IconButton onClick={() => handleEdit(params.data)} size="small" color="primary">
                    <EditIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleView(params.data)} size="small" color="info">
                    <VisibilityIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(params.data)} size="small" color="error">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </Box>
        ),
        width: 220,
        pinned: 'right',
    };


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
                columnDefs={[...columnDefs, actionColumn]}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight"
                rowHeight={50}
            />
        </div>
    );
};


type DataGridProps = {
    rowData: any[];
    columnDefs: any[];
    onDelete: (id: string) => void;
};




export default DataGrid;
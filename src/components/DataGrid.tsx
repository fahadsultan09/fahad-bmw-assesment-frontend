import React, { useRef, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from "ag-grid-react";
import { Box, SelectChangeEvent } from '@mui/material';
import { formatDate } from '../helpers/dateFormat';
import SearchBar from './SearchBar';
import ModalBox from './ModalBox';
import ActionIcon from './ActionIcon';
import { searchCar } from '../services/apiConfiguration';
import FilterBar from './FilterBar';

type Props = {
    rowData: any[];
    columnDefs: any[];
    onDelete: (id: string) => void;
};

const DataGrid: React.FC<Props> = ({ rowData, columnDefs, onDelete }) => {

    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(rowData);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const gridRef = useRef<any>(null);

    const handleSearch = async () => {
        try {
            const { data, error } = await searchCar(searchText, filterBy);

            if (!data) {
                setFilteredData([])
            }
            setFilteredData(data)
        } catch (error) {
            console.error("Error fetching search results:", error);
            setFilteredData([]); // fallback in case of error
        }
    };

    const handleView = (row: any) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const handleDeleteClick = (row: any) => {
        onDelete(row);
    };

    const columns: ColDef[] = [
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
        { headerName: "Range (Km)", field: "Range_Km", width: 120 },
        { headerName: "Efficiency (WhKm)", field: "Efficiency_WhKm", width: 120 },
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
                    <ActionIcon type="delete" onClick={() => handleDeleteClick(params.data)} />
                </div>
            )
        }
    ];


    const [filterBy, setFilterBy] = React.useState('');

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilterBy(event.target.value);
    };

    const paginationPageSize = 10; // Number of rows per page
    const defaultColDef = {
        sortable: true,
        filter: true,
    };

    return (
        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
            <ModalBox
                modalOpen={modalOpen}
                selectedRow={selectedRow}
                handleClose={handleClose}
            />
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>

                <FilterBar
                    value={filterBy}
                    onChange={handleFilterChange}
                />
                <SearchBar
                    value={searchText}
                    onChange={setSearchText}
                    onSearch={handleSearch}
                />
            </Box>

            <AgGridReact
                ref={gridRef}
                rowData={filteredData}
                columnDefs={[...columns]}
                rowHeight={50}
                pagination={true}
                paginationPageSize={paginationPageSize}
                domLayout='autoHeight'
                defaultColDef={defaultColDef}
                getRowClass={(params) =>
                    (params.node?.rowIndex ?? -1) % 2 === 0 ? 'even-row' : 'odd-row'
                }
            />
        </div>
    );
};



export default DataGrid;

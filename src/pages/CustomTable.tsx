import React, { useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import DataGrid from '../components/DataGrid';
import ViewPage from './ViewPage';

ModuleRegistry.registerModules([AllCommunityModule]);

const CustomTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>(
    [
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
      { headerName: "FastCharge (KmH)", field: "FastCharge_KmH", width: 120 },
      { headerName: "Rapid Charge", field: "RapidCharge", width: 120 },
      { headerName: "Power Train", field: "PowerTrain" },
      { headerName: "Plug Type", field: "PlugType" },
      { headerName: "Body Style", field: "BodyStyle" },
      { headerName: "Segment", field: "Segment", width: 120 },
      { headerName: "Seats", field: "Seats", width: 120 },
      {
        headerName: "Price (€)",
        field: "PriceEuro",
        valueFormatter: (params: any) => params.value ? "€ " + params.value : params.value,
        cellStyle: { textAlign: "left" }
      },
      {
        headerName: "Date",
        field: "Date",
        valueFormatter: (params: any) => params.value ? formatDate(params.value) : params.value

      },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/api/cars');

      setData(response.data.data);
      if (response.data.data.length) {
        setColumns(columns);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`api/cars/${id}`);
    setData(data.filter((item) => item.id !== id));
  };

  const formatDate = (dateParams: any) => {
    const date = new Date(dateParams);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (

    <Router>
      <Routes>
        <Route path="/" element={
          <DataGrid rowData={data} columnDefs={columns} onDelete={handleDelete} />
        } />

        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default CustomTable;

import React, { useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import DataGrid from '../components/DataGrid';
import ViewPage from './ViewPage';
import { fetchCars, deleteCar } from '../services/apiConfiguration';
import { tableColumns } from '../helpers/columns';

ModuleRegistry.registerModules([AllCommunityModule]);

const CustomTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>(tableColumns);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCars();
      if (response.data.success) {
        setData(response.data.data);
        setColumns(columns);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    await axios.delete(`api/cars/${id}`);
    setData(data.filter((item) => item.id !== id));
  };

  return (

    <Router>
      <Routes>
        <Route path="/" element={
          <DataGrid
            rowData={data}
            columnDefs={columns}
            onDelete={handleDelete}
          />
        } />

        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default CustomTable;

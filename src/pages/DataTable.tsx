import React, { useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { fetchCars, deleteCar } from '../services/apiConfiguration';
import { tableColumns } from '../helpers/columns';
import DataGrid from '../components/DataGrid';
import ViewPage from './ViewPage';
import Loading from '../components/Loading';

ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const navigate = useNavigate();

  const onView = (row: any) => navigate(`/view/${row.id}`, { state: { data: row } });
  
  const onEdit = (row: any) => console.log("Edit", row); 

  const onDelete = async (row: any) => {
    try {
      await deleteCar(row._id);
      setData((prev) => prev.filter((item) => item._id !== row._id));
    } catch (err) { }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data, error } = await fetchCars();
      if (data) {
        setData(data);
        setColumns(tableColumns(onView, onEdit, onDelete));
      } else {

      }
    };
    fetchDataAsync();
  }, []);

  if (!data.length) {
    return (<Loading />);
  }

  return (
    <>

      <Routes>
        <Route
          path="/"
          element={
            <DataGrid
              rowData={data}
              columnDefs={columns}
              onDelete={onDelete}
            />
          }
        />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </>
  );
};

export default DataTable;



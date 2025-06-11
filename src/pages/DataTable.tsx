import React, { useState, useEffect } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { Routes, Route } from 'react-router-dom';
import { fetchCars, deleteCar } from '../services/apiConfiguration';
import { tableColumns } from '../helpers/columns';
import DataGrid from '../components/DataGrid';
import ViewPage from './ViewPage';
import Loading from '../components/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ModuleRegistry.registerModules([AllCommunityModule]);

const DataTable: React.FC = () => {

  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  const onDelete = async (row: any) => {
    try {
      await deleteCar(row._id);
      setData((prev) => prev.filter((item) => item._id !== row._id));
      toast.success("Car deleted successfully", {
        icon: <span>✅</span>,
        style: {
          backgroundColor: '#1E3A8A',  // formal blue
          color: 'white',
          fontWeight: '600',
        },
      });
    } catch (err) {
      toast.error("Failed to delete car",{
        icon: <span>❌</span>,
        style: {
          backgroundColor: '#B91C1C',  // formal/dark red
          color: 'white',
          fontWeight: '600',
        },
      });

    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      const { data, error } = await fetchCars();
      if (data) {
        setData(data);
        setColumns(tableColumns());
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{
          fontSize: '14px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      />
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



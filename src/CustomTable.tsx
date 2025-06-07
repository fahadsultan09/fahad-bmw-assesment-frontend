import React, { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Box, Button, Typography, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';

ModuleRegistry.registerModules([AllCommunityModule]);

const randomData = [{ "_id": "67859bd414a5526b455eb1ef", "Brand": "Tesla ", "Model": "Model 3 Long Range Dual Motor", "AccelSec": 4.6, "TopSpeed_KmH": 233, "Range_Km": 450, "Efficiency_WhKm": 161, "FastCharge_KmH": 940, "RapidCharge": true, "PowerTrain": "AWD", "PlugType": "Type 2 CCS", "BodyStyle": "Sedan", "Segment": "D", "Seats": 5, "PriceEuro": 55480, "Date": "2016-08-23T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f0", "Brand": "Volkswagen ", "Model": "ID.3 Pure", "AccelSec": 10, "TopSpeed_KmH": 160, "Range_Km": 270, "Efficiency_WhKm": 167, "FastCharge_KmH": 250, "RapidCharge": true, "PowerTrain": "RWD", "PlugType": "Type 2 CCS", "BodyStyle": "Hatchback", "Segment": "C", "Seats": 5, "PriceEuro": 30000, "Date": "2016-08-24T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f1", "Brand": "Polestar ", "Model": "2", "AccelSec": 4.7, "TopSpeed_KmH": 210, "Range_Km": 400, "Efficiency_WhKm": 181, "FastCharge_KmH": 620, "RapidCharge": true, "PowerTrain": "AWD", "PlugType": "Type 2 CCS", "BodyStyle": "Liftback", "Segment": "D", "Seats": 5, "PriceEuro": 56440, "Date": "2016-08-25T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f2", "Brand": "BMW ", "Model": "iX3 ", "AccelSec": 6.8, "TopSpeed_KmH": 180, "Range_Km": 360, "Efficiency_WhKm": 206, "FastCharge_KmH": 560, "RapidCharge": true, "PowerTrain": "RWD", "PlugType": "Type 2 CCS", "BodyStyle": "SUV", "Segment": "D", "Seats": 5, "PriceEuro": 68040, "Date": "2016-08-28T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f3", "Brand": "Honda ", "Model": "e ", "AccelSec": 9.5, "TopSpeed_KmH": 145, "Range_Km": 170, "Efficiency_WhKm": 168, "FastCharge_KmH": 190, "RapidCharge": true, "PowerTrain": "RWD", "PlugType": "Type 2 CCS", "BodyStyle": "Hatchback", "Segment": "B", "Seats": 4, "PriceEuro": 32997, "Date": "2016-08-29T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f4", "Brand": "Lucid ", "Model": "Air ", "AccelSec": 2.8, "TopSpeed_KmH": 250, "Range_Km": 610, "Efficiency_WhKm": 180, "FastCharge_KmH": 620, "RapidCharge": true, "PowerTrain": "AWD", "PlugType": "Type 2 CCS", "BodyStyle": "Sedan", "Segment": "F", "Seats": 5, "PriceEuro": 105000, "Date": "2016-08-30T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f5", "Brand": "Volkswagen ", "Model": "e-Golf ", "AccelSec": 9.6, "TopSpeed_KmH": 150, "Range_Km": 190, "Efficiency_WhKm": 168, "FastCharge_KmH": 220, "RapidCharge": true, "PowerTrain": "FWD", "PlugType": "Type 2 CCS", "BodyStyle": "Hatchback", "Segment": "C", "Seats": 5, "PriceEuro": 31900, "Date": "2016-08-31T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f6", "Brand": "Peugeot ", "Model": "e-208 ", "AccelSec": 8.1, "TopSpeed_KmH": 150, "Range_Km": 275, "Efficiency_WhKm": 164, "FastCharge_KmH": 420, "RapidCharge": true, "PowerTrain": "FWD", "PlugType": "Type 2 CCS", "BodyStyle": "Hatchback", "Segment": "B", "Seats": 5, "PriceEuro": 29682, "Date": "2016-09-01T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f7", "Brand": "Tesla ", "Model": "Model 3 Standard Range Plus", "AccelSec": 5.6, "TopSpeed_KmH": 225, "Range_Km": 310, "Efficiency_WhKm": 153, "FastCharge_KmH": 650, "RapidCharge": true, "PowerTrain": "RWD", "PlugType": "Type 2 CCS", "BodyStyle": "Sedan", "Segment": "D", "Seats": 5, "PriceEuro": 46380, "Date": "2016-09-04T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f8", "Brand": "Audi ", "Model": "Q4 e-tron ", "AccelSec": 6.3, "TopSpeed_KmH": 180, "Range_Km": 400, "Efficiency_WhKm": 193, "FastCharge_KmH": 540, "RapidCharge": true, "PowerTrain": "AWD", "PlugType": "Type 2 CCS", "BodyStyle": "SUV", "Segment": "D", "Seats": 5, "PriceEuro": 55000, "Date": "2016-09-05T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1f9", "Brand": "Mercedes ", "Model": "EQC 400 4MATIC", "AccelSec": 5.1, "TopSpeed_KmH": 180, "Range_Km": 370, "Efficiency_WhKm": 216, "FastCharge_KmH": 440, "RapidCharge": true, "PowerTrain": "AWD", "PlugType": "Type 2 CCS", "BodyStyle": "SUV", "Segment": "D", "Seats": 5, "PriceEuro": 69484, "Date": "2016-09-06T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1fa", "Brand": "Nissan ", "Model": "Leaf ", "AccelSec": 7.9, "TopSpeed_KmH": 144, "Range_Km": 220, "Efficiency_WhKm": 164, "FastCharge_KmH": 230, "RapidCharge": true, "PowerTrain": "FWD", "PlugType": "Type 2 CHAdeMO", "BodyStyle": "Hatchback", "Segment": "C", "Seats": 5, "PriceEuro": 29234, "Date": "2016-09-07T22:00:00.000Z", "__v": 0 }, { "_id": "67859bd414a5526b455eb1fb", "Brand": "Hyundai ", "Model": "Kona Electric 64 kWh", "AccelSec": 7.9, "TopSpeed_KmH": 167, "Range_Km": 400, "Efficiency_WhKm": 160, "FastCharge_KmH": 380, "RapidCharge": true, "PowerTrain": "FWD", "PlugType": "Type 2 CCS", "BodyStyle": "SUV", "Segment": "B", "Seats": 5, "PriceEuro": 40795, "Date": "2016-09-08T22:00:00.000Z", "__v": 0 }]

const apiData = { data: { data: randomData } }

const CustomTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = apiData || await axios.get('http://localhost:3001/api/cars');
      console.log(JSON.stringify(response.data.data))

      setData(response.data.data);
      if (response.data.data.length) {
        setColumns(Object.keys(response.data.data[0]).map((key) => ({ headerName: key, field: key })));
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
          <DataGrid rowData={data} columnDefs={columns} onDelete={handleDelete} />
        } />

        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  );
};

export default CustomTable;

type DataGridProps = {
  rowData: any[];
  columnDefs: any[];
  onDelete: (id: string) => void;
};

const DataGrid: React.FC<DataGridProps> = ({ rowData, columnDefs, onDelete }) => {``

  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(rowData);


  const navigate = useNavigate();

  const handleView = (row: any) => {
    navigate(`/view/${row.id}`, { state: { data: row } });
  };

  const actionColumn = {
    headerName: 'Actions',
    cellRendererFramework: (params: any) => (
      <>
        <Button onClick={() => handleView(params.data)}>View</Button>
        <Button color="error" onClick={() => onDelete(params.data.id)}>Delete</Button>
      </>
    ),
  };

  const handleSearch = () => {
    const filtered = rowData.filter((row) =>
      Object.values(row).some((value: any) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredData(filtered);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search by any field..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <AgGridReact
        rowData={rowData}
        columnDefs={[...columnDefs, actionColumn]}
        pagination={true}
      />
    </div>
  );
};

const ViewPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
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


// import React, { useState } from 'react';
// import { TextField, Container, Typography, Box } from '@mui/material';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // Theme CSS

// const App = () => {
//   // Sample data for the grid
//   const [rowData] = useState([
//     { id: 1, name: 'John Doe', age: 28, country: 'USA' },
//     { id: 2, name: 'Jane Smith', age: 34, country: 'UK' },
//     { id: 3, name: 'Sam Brown', age: 22, country: 'Canada' },
//     { id: 4, name: 'Emily Davis', age: 40, country: 'Australia' },
//   ]);

//   // Column definitions
//   const [columnDefs] = useState([
//     { field: 'id', headerName: 'ID', sortable: true, filter: true },
//     { field: 'name', headerName: 'Name', sortable: true, filter: true },
//     { field: 'age', headerName: 'Age', sortable: true, filter: true },
//     { field: 'country', headerName: 'Country', sortable: true, filter: true },
//   ]);

//   // State for search functionality
//   const [searchText, setSearchText] = useState('');

//   // Filter rows based on the search text
//   const filteredData = rowData.filter((row) =>
//     Object.values(row).some((value) =>
//       value.toString().toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Data Grid with Search
//       </Typography>
//       <Box sx={{ mb: 2 }}>
//         <TextField
//           fullWidth
//           label="Search"
//           variant="outlined"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           placeholder="Search by any field..."
//         />
//       </Box>
//       <div
//         className="ag-theme-alpine"
//         style={{ height: '400px', width: '100%' }}
//       >
//         <AgGridReact
//           rowData={filteredData}
//           columnDefs={columnDefs}
//           pagination={true}
//           paginationPageSize={10}
//         />
//       </div>
//     </Container>
//   );
// };

// export default App;



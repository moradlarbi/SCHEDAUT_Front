import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Timeline } from 'planby/dist/Epg/components';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'age', headerName: 'Age', width: 150 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Doe', age: 25 },
];

function App() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        MUI Data Grid Example
      </Typography>
      <DataGrid rows={rows} columns={columns} checkboxSelection />
      
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Planby Timeline Example
        </Typography>
        
      </Box>
    </div>
  );
}

export default App;

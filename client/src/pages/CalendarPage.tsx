import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper, Grid, TextField, Autocomplete, Button } from '@mui/material';
import SchoolCalendar from '../components/SchoolCalendar';
import { fetchClass, fetchEventsByClass } from '../api/event';
import * as XLSX from 'xlsx';
const CalendarPage: React.FC = () => {
  const [idClass, setIdClass] = useState<number | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [classes, setClasses] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch classes on component mount
    const fetchData = async () => {
      try {
        const dataClass = await fetchClass();
        setClasses(dataClass);
        console.log(dataClass)
      } catch (error) {
        console.error("Failed to fetch classes", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch events when a class is selected
    if (idClass) {
      const fetchEvents = async () => {
        try {
          const dataEvents = await fetchEventsByClass(idClass);
          setEvents(dataEvents);
        } catch (error) {
          console.error("Failed to fetch events", error);
        }
      };
      fetchEvents();
    }
  }, [idClass]);
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(events); // Convert events to sheet
    const wb = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Events'); // Append the sheet to the workbook
    XLSX.writeFile(wb, 'events.xlsx'); // Trigger download
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f4f7fc', // Fond léger et moderne pour la page
        minHeight: '100vh',
        padding: 5,
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12}>
          <Paper
            sx={{
              padding: 4,
              backgroundColor: '#ffffff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)', // Ombre plus marquée pour une profondeur
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                marginBottom: 3,
                fontWeight: 600,
                fontSize: '1.5rem',
                color: '#34495e',
              }}
            >
              Your Calendar
            </Typography>

            {/* Barre de recherche */}
            <Autocomplete
              options={classes}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) => setIdClass(value ? value.id : null)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Class"
                  variant="outlined"
                  sx={{ width: '400px', marginBottom: 3 }}
                />
              )}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: 3 }}
              onClick={exportToExcel} // Handle export
            >
              Export to Excel
            </Button>
            {/* Conteneur du calendrier */}
            <Box
              sx={{
                padding: '30px',
                backgroundColor: '#ecf0f1', // Fond clair et doux
                borderRadius: '15px', // Coins arrondis pour un aspect moderne
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Ombre légère
                width: '100%',
              }}
            >
              <SchoolCalendar events={events} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CalendarPage;

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { Box, IconButton, Menu, MenuItem } from "@mui/material";

const SchoolCalendar = (events : any) => {
  const handleDateClick = (arg: any) => {
    alert(`Date 2 clicked: ${arg.dateStr}`);
  };
  useEffect(() => {
    console.log(events)
  }, [events])
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      editable={true}
      selectable={true} 
      allDaySlot={false} 
      slotMinTime="08:00:00" 
      slotMaxTime="19:00:00"
      contentHeight="auto"
      weekends={false}
      timeZone="UTC" // Si nécessaire pour éviter des ajustements automatiques par FullCalendar
      events={events} 
      dayHeaderContent={(arg) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
          weekday: 'short', 
          day: '2-digit',  
          month: 'short',   
        }).format(arg.date);
        
        return `${formattedDate}.`;
      }}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        hour12: false, 
      }}
      eventContent={(arg) => (
        <Box sx={{ display: 'flex', flexDirection: 'column',borderRadius:'5px',backgroundColor:'#3788d8!important' }}>
          <Box sx={{ fontWeight: 'bold' }}>{arg.event.title}</Box> {/* Module */}
          <Box>{arg.event.extendedProps.class}</Box> {/* Salle de classe */}
          <Box sx={{ fontStyle: 'italic' }}>{arg.event.extendedProps.teacher}</Box> {/* Professeur */}
          <Box>{arg.event.extendedProps.salle}</Box> {/* Salle */}
        </Box>
      )}
      dateClick={handleDateClick} // Event handler for date clicks
      eventClick={(info) => alert(`Event clicked: ${info.event}`)} // Event handler for event clicks
    />
  );
};

export default SchoolCalendar;

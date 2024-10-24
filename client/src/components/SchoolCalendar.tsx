import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; 

const SchoolCalendar = () => {
  const handleDateClick = (arg: any) => {
    alert(`Date clicked: ${arg.dateStr}`);
  };

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
      dayHeaderContent={(arg) => {
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
          weekday: 'short', // Short weekday (e.g., Mon.)
          day: '2-digit',   // Day before month
          month: 'short',    // Full month name (e.g., November)
        }).format(arg.date);
        
        return `${formattedDate}.`; // Add a dot after the weekday
      }}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        hour12: false, 
      }}
      events={[
        {
          title: 'CM',
          start: '2024-10-24T10:00:00',
          end: '2024-10-24T12:00:00',
          module: 'SQL',
          classroom: 'Salle 108'
        },
        {
          title: 'TD',
          start: '2024-10-25T13:00:00',
          end: '2024-10-25T14:30:00',
          module: 'COOL',
          classroom: 'Salle 109'
        },
      ]}
      eventContent={(arg) => (
        <>
          <b>{arg.event.title}</b> {/* Titre de l'événement */}
          <div>{arg.event.extendedProps.module}</div> {/* Module */}
          <div>{arg.event.extendedProps.classroom}</div> {/* Salle de classe */}
        </>
      )}
      dateClick={handleDateClick} // Event handler for date clicks
      eventClick={(info) => alert(`Event clicked: ${info.event.title}`)} // Event handler for event clicks
    />
  );
};

export default SchoolCalendar;

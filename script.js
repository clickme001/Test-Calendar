// script.js

// Import necessary FullCalendar libraries
import { Calendar } from 'https://unpkg.com/@fullcalendar/core@6.1.15/dist/fullcalendar.esm.js';
import dayGridPlugin from 'https://unpkg.com/@fullcalendar/daygrid@6.1.15/dist/fullcalendar.esm.js';
import interactionPlugin from 'https://unpkg.com/@fullcalendar/interaction@6.1.15/dist/fullcalendar.esm.js';
import { ICAL } from 'https://unpkg.com/ical.js@1.4.0/dist/ical.js'; // Ensure the version matches your needs

<<<<<<< HEAD
// Function to fetch calendar events from the iCal proxy
=======
// Initialize the calendar with the necessary plugins
const calendar = new Calendar(calendarEl, {
  plugins: [dayGridPlugin, interactionPlugin,],
  //... (rest of the calendar configuration)
});

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialDate: new Date(),
        navLinks: true, // can click day/week labels to navigate views
        editable: false,
        dayMaxEvents: true, // allow "more" link when too many events
        events: fetchCalendarEvents(), // Fetch events from the server
    });
    calendar.render();
});

>>>>>>> 4c26a382bd0b395cf756a3853caaff65f2efa6b8
function fetchCalendarEvents() {
    return fetch('/ical-proxy')
       .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
<<<<<<< HEAD
       .then(data => {
            try {
                const ical = ICAL.parse(data);
                const component = new ICAL.Component(ical);
                const events = component.getAllSubcomponents('vevent');
                const fullCalendarEvents = [];

                events.forEach(event => {
                    const summary = event.getFirstPropertyValue('summary');
                    const start = event.getFirstPropertyValue('dtstart').toJSDate();
                    const end = event.getFirstPropertyValue('dtend').toJSDate();

                    fullCalendarEvents.push({
                        title: summary,
                        start: start,
                        end: end
                    });
                });
                return fullCalendarEvents;
            } catch (parseError) {
                console.error('Error parsing ICS feed:', parseError);
                return []; // Return an empty array on parsing error
            }
        })
       .catch(error => {
            console.error('Error fetching or processing ICS feed:', error);
            return []; // Return an empty array on other errors
        });
}

// Initialize the calendar upon DOM content load
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    if (calendarEl) { // Ensure the calendar element exists
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin], // Include interactionPlugin if utilized
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            initialDate: new Date(),
            navLinks: true, // Can click day/week labels to navigate views
            editable: false,
            dayMaxEvents: true, // Allow "more" link when too many events
            events: fetchCalendarEvents() // Fetch events from the server
        });
        calendar.render();
    } else {
        console.error("Calendar element not found. Please add a div with the id 'calendar'.");
    }
});
=======
     .catch(error => {
            console.error('Error fetching or parsing ICS feed:', error,);
            return []; // Return an empty array on error
        });
}
>>>>>>> 4c26a382bd0b395cf756a3853caaff65f2efa6b8

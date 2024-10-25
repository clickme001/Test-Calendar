import { Calendar } from 'https://unpkg.com/@fullcalendar/core@6.1.15/dist/fullcalendar.esm.js';
import dayGridPlugin from 'https://unpkg.com/@fullcalendar/daygrid@6.1.15/dist/fullcalendar.esm.js';
import interactionPlugin from 'https://unpkg.com/@fullcalendar/interaction@6.1.15/dist/fullcalendar.esm.js';
import { ICAL } from 'https://unpkg.com/ical.js@1.4.0/dist/ical.js';

function fetchCalendarEvents() {
    return fetch('/ical-proxy')
       .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
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

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    
    if (calendarEl) {
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, interactionPlugin],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            initialDate: new Date(),
            navLinks: true,
            editable: false,
            dayMaxEvents: true,
            events: fetchCalendarEvents()
        });
        calendar.render();
    } else {
        console.error("Calendar element not found. Please add a div with the id 'calendar'.");
    }
});

import { Calendar } from 'https://unpkg.com/@fullcalendar/core@6.1.15/dist/fullcalendar.esm.js';
import interactionPlugin from 'https://unpkg.com/@fullcalendar/interaction@6.1.15/dist/fullcalendar.esm.js';
import dayGridPlugin from 'https://unpkg.com/@fullcalendar/daygrid@6.1.15/dist/fullcalendar.esm.js';

// Initialize the calendar with the necessary plugins
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, interactionPlugin],
        //... (rest of the calendar configuration)
    });

    calendar.render();
});

function fetchCalendarEvents() {
    return fetch('/ical-proxy')
        .then(response => response.text())
        .then(data => {
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
            return fullCalendarEvents; // Ensure this line is not missing
        })
        .catch(error => {
            console.error('Error fetching or parsing ICS feed:', error);
            return []; // Return an empty array on error to prevent syntax issues
        });
} // Ensure this closing bracket is present
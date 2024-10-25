const express = require('express');
const app = express();
const port = 3000; // Your proxy server port
const icsFeedUrl = "https://outlook.office365.com/owa/calendar/574de64893d341f5830fd85fd5334d9a@hibberdeneacademy.co.za/4a1824c5b4c44e719952108d4204783c2369719853097695468/calendar.ics"; // Replace with your ICS feed URL
const axios = require('axios'); // For making HTTP requests
const cors = require('cors'); // Add CORS middleware
const path = require('path'); // For serving static files

// Enable CORS for all routes
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.static('public'));

app.use(express.static(__dirname));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ICS Feed Proxy Route
app.get('/ical-proxy', (req, res) => {
    axios.get(icsFeedUrl)
       .then(response => {
            res.set("Content-Type", "text/calendar");
            res.set("Content-Disposition", `attachment; filename="calendar.ics"`);
            res.send(response.data);
        })
       .catch(error => {
            console.error(error);
            res.status(500).send('Error fetching ICS feed');
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(`Access your calendar at: http://localhost:${port}/`);
    console.log(`ICS Feed Proxy available at: http://localhost:${port}/ical-proxy`);
});

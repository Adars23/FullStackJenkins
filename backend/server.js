const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors')

const app = express();
const PORT = 5002;

app.use(bodyParser.json());

app.use(cors());

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin', // Replace with your MySQL username
  password: 'admin123', // Replace with your MySQL password
  database: 'simple_database', // Replace with your MySQL database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/favicon.ico', (req, res) => res.status(204));

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/*// Endpoint to handle data submission
app.post('/api', (req, res) => {
  const receivedData = req.body.data;
  console.log('Received data:', receivedData);
  // Here you can process the received data as needed
  console.log('Received data:', receivedData);

  // Sending a response back to the frontend
  res.json({ message: 'Data received successfully!' });

// Insert data into MySQL
  const sql = 'INSERT INTO data (data) VALUES (?)';
  db.query(sql, receivedData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Data inserted into MySQL');
    res.json({ message: 'Data received and inserted into MySQL successfully!' });
  });
});*/

// Endpoint to handle data submission
app.post('/api', (req, res) => {
  const receivedData = req.body.data;
  console.log('Received data:', receivedData);

  // Insert data into MySQL
  const sql = 'INSERT INTO data (data) VALUES (?)';
  db.query(sql, [receivedData], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      // Send an error response
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log('Data inserted into MySQL');
    // Send a success response
    res.json({ message: 'Data received and inserted into MySQL successfully!' });
  });
});

app.get('/api', (req, res) => {
  // Fetch data from MySQL
  const sql = 'SELECT * FROM data';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('Data fetched from MySQL:', result);
    res.json(result);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://64.227.164.200:${PORT}`);
});

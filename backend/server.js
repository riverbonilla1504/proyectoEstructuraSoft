const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());



// Configuración de conexión a la base de datos
const db = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'TGoKybDCVolYCvdfQlarMlsqIrdnpWqd',
  database: 'railway',
  port: 53793
});
// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if all required fields are present
  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Corrected select statement
  db.query(
    "SELECT * FROM login WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        console.error('Error selecting values:', err);
        return res.status(500).send('An error occurred while selecting values');
      } else if (result.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        res.send('Login successful');
      }
    }
  );
});
// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if all required fields are present
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Corrected insert statement
  db.query(
    "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('Error inserting values:', err);
        return res.status(500).send('An error occurred while inserting values');
      } else {
        res.send('Values Inserted');
      }
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

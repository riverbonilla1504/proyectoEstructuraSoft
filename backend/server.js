const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Configuración de conexión a la base de datos
const db = mysql.createConnection({
  host: 'miproyectodb.c9mqeqm82gme.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'river123',
  database: 'signup',
  port: 3306
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Check if user exists
app.post('/check-user', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  db.query(
    "SELECT * FROM login WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).send('An error occurred while checking the user');
      } else {
        res.send({ exists: result.length > 0 });
      }
    }
  );
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }

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

  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

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
app.use(express.static(path.join(__dirname, '../proyecto/build')));

// Handles any requests that don't match the API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

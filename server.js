const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render gives this
  ssl: { rejectUnauthorized: false }
});

// Create user
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

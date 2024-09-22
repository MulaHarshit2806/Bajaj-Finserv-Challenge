const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST Endpoint for '/bfhl'
app.post('/bfhl', (req, res) => {
  const { data, file_b64, email, roll_number } = req.body;

  // Extract numbers and alphabets
  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));

  // Get highest lowercase alphabet
  const lowercaseAlphabets = alphabets.filter(char => char === char.toLowerCase());
  const highestLowercase = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

  // File validation logic
  let file_valid = false;
  let file_mime_type = '';
  let file_size_kb = 0;
  if (file_b64) {
    const buffer = Buffer.from(file_b64, 'base64');
    file_size_kb = buffer.length / 1024;
    file_mime_type = 'image/png'; // Assume it's PNG for simplicity
    file_valid = true;
  }

  // Send response
  res.status(200).json({
    is_success: true,
    user_id: 'mula_harshit_28062003',
    email: "mm7238@srmist.edu.in",
    roll_number: "RA2111050010008",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid,
    file_mime_type,
    file_size_kb
  });
});

// GET Endpoint for '/bfhl'
app.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

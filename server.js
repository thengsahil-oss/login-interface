const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-change-this-in-production';

// Supabase configuration
const SUPABASE_URL = 'https://ezsabizkfvwjqcqcnljs.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bBV6TNB4UfwDttjP4nL8UA_iCkxRPoB';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Register route using Supabase Auth
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // First, create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    // Now, insert user data into a users table (if you have one)
    // Alternatively, we'll just return success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route using Supabase Auth
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    // Create a custom JWT token for our app
    const token = jwt.sign(
      { userId: data.user.id, email: data.user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token, user: data.user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Using Supabase for authentication!');
});

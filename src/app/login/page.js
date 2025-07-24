'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Container,
  Box,
  Typography
} from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { green } from '@mui/material/colors';



export default function LoginPage() {
  const router = useRouter();
  const [weather, setWeatherData] = useState(null);

  

  const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

   useEffect(() => {
  
      // Fetch weather
      fetch('http://localhost:3000/api/getWeather')
        .then((res) => res.json())
        .then((weather) => setWeatherData(weather))
        .catch((err) => {
          console.error('Weather fetch failed', err);
        });
    }, []);

  if (!weather) return <p>Loading...</p>;

  // Async function to call the login API with email and password
  async function runDBCallAsync(email, pass) {
    // Call backend login API using POST request with JSON body
    const res = await fetch('/api/login', {
      method: 'POST', // POST method
      headers: { 'Content-Type': 'application/json' }, // JSON headers
      body: JSON.stringify({ email, pass }), // Send email and pass in JSON format
    });

    // Parse JSON response from the API
    const data = await res.json();

    // If login is valid according to API responses
    if (data.data === "valid") {
    if (data.role === "manager") {
      // Redirect to manager dashboard
      router.push('/Manager');
    } else {
      // Redirect to customer dashboard
      router.push('/dashboard');
    }
  } else {
    alert('Invalid credentials');
  }
}

  // Form submission handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Extract form data (email and password)
    const formData = new FormData(event.currentTarget);

    const email = formData.get('email');
    const pass = formData.get('pass');

    // Call the async login function
    runDBCallAsync(email, pass);
  };



  return (
  <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
              {/* Header / AppBar */}
              <AppBar position="static" sx={{ backgroundColor: 'red'}}s>
                <Toolbar>
                  <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Dominosapp
                  </Typography>
                  {/*<Button color="inherit" onClick={() => router.push('/')}>Home</Button>*/}
          
                </Toolbar>
              </AppBar>


              {/* Main Content */}
              <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
    

              </Container>
            </Box>
          


    
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }}>

          <Typography variant="h5" gutterBottom>
              Today's Temperature: {weather.temp}°C
          </Typography>

          {/* Login form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/* Email input */}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            {/* Password input */}
            <TextField
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Password"
              type="password"
              id="pass"
              autoComplete="current-password"
            />

            {/* Remember me checkbox */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {/* Submit button */}
            <Button
              
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', // Custom blue
             '&:hover': {
              backgroundColor: '#4caf50', // Darker on hover
                }
              }}
            >
              Sign In
            </Button>

  
            
            {/* Register button*/}
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#388e3c',
                },
              }}
              onClick={() => router.push('/newregister')} 
            >
              Sign up
            </Button>


          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

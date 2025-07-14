'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Button, TextField, FormControlLabel,
  Checkbox, Container, Box
} from '@mui/material';

export default function LoginPage() {
  const router = useRouter();

  // Async function to call the login API with email and password
  async function runDBCallAsync(email, pass) {
    // Call your backend login API using POST request with JSON body
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass }),
    });

    // Parse JSON response from the API
    const data = await res.json();

    // If login is valid according to API response
    if (data.data === "valid") {
      // Redirect to dashboard page
      router.push('/dashboard');
    } else {
      // Show an alert if login failed
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
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

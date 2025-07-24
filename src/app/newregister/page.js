

'use client';

import React from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography
} from '@mui/material';
import { useRouter } from 'next/navigation';

export default function NewRegisterPage() {
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form behavior
    const data = new FormData(event.currentTarget);

    // Collect form fields
    const email = data.get('email');
    const pass = data.get('pass');
    const tel = data.get('tel');
    const address = data.get('address');
    const email2 = data.get('email2');
    const pass2 = data.get('pass2');

    console.log("Registering user:", { email, pass, tel, address, email2, pass2 });

    // Make call to API
    try {
      const res = await fetch(
        `/api/newregister?email=${email}&pass=${pass}&tel=${tel}&address=${address}&email2=${email2}&pass2=${pass2}`
      );
      const json = await res.json();

      if (json.data === "valid") {
        alert("Registration successful!");
        router.push('/login'); // Redirect to login page
      } else {
        alert("Registration failed: " + json.message);
      }

    } catch (err) {
      console.error("Error calling registration API:", err);
      alert("Error connecting to server.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom align="center">Register</Typography>

          {/* Email */}
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

          {/* Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="pass"
            label="Password"
            type="password"
            id="pass"
            autoComplete="new-password"
          />

          {/* Telephone */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="tel"
            label="Telephone"
            name="tel"
            autoComplete="tel"
          />

          {/* Address */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="street-address"
          />

          {/* Confirm Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email2"
            label="Confirm Email"
            name="email2"
            autoComplete="email"
          />

          {/* Confirm Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="pass2"
            label="Confirm Password"
            name="pass2"
            type="password"
            autoComplete="new-password"
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

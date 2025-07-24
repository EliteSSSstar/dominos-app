'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Box,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { green } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
  },
});

export default function ManagerPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: 'red' }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dominosapp
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Manager Dashboard
        </Typography>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : customers.length === 0 ? (
          <Typography>No customers found.</Typography>
        ) : (
          customers.map((customer) => (
            <Box
              key={customer._id}
              sx={{
                borderBottom: '1px solid #ccc',
                mb: 4,
                pb: 2,
              }}
            >
              <Typography variant="h6">{customer.email}</Typography>
              <Typography>
                <strong>Phone:</strong> {customer.tel || 'N/A'}
              </Typography>
              <Typography sx={{ mt: 1 }}>No shopping history.</Typography>
            </Box>
          ))
        )}
      </Container>
    </ThemeProvider>
  );
}

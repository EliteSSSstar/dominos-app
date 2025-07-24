'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

export default function Page() {
  const [data, setData] = useState(null);
  const [weather, setWeatherData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch products
    fetch('http://localhost:3000/api/getProducts')
      .then((res) => res.json())
      .then((data) => setData(data));

    // Fetch weather
    fetch('http://localhost:3000/api/getWeather')
      .then((res) => res.json())
      .then((weather) => setWeatherData(weather))
      .catch((err) => {
        console.error('Weather fetch failed', err);
      });
  }, []);

  const theme = createTheme({
    palette: {
      secondary: {
        main: green[500],
      },
    },
  });

  if (!data || !weather) return <p>Loading...</p>;

  // Add to cart function
  function putInCart(pname, price) {
    console.log("putting in cart: " + pname);
    fetch(`http://localhost:3000/api/putInCart?pname=${pname}&price=${price}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* Header / AppBar */}
        <AppBar position="static" sx={{ backgroundColor: 'red'}}>
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dominosapp
            </Typography>
            {/*<Button color="inherit" onClick={() => router.push('/')}>Home</Button>*/}
            <Button color="inherit" onClick={() => router.push('/login')}>Logout</Button>
            <Button color="inherit" onClick={() => router.push('/cart')}>Cart</Button>
          </Toolbar>
        </AppBar>


        {/* Main Content */}
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
          {/* Weather Display */}
          <Typography variant="h5" gutterBottom>
            Today's Temperature: {weather.temp}°C
          </Typography>

          {/* Products List */}
          <Typography variant="h6" gutterBottom>
            Product List
          </Typography>

          {data.map((item, i) => (
            <Box
              key={i}
              sx={{
                p: 2,
                my: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="body1">
                <strong>Unique ID:</strong> {item._id}
              </Typography>
              <Typography variant="h6">
                {item.pname} - ${item.price}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => putInCart(item.pname, item.price)}
              >
                Add to cart
              </Button>
            </Box>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

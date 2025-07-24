'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [weather, setWeatherData] = useState(null);
   const router = useRouter();

  useEffect(() => {
    // Fetch cart items from your backend or local storage
    async function fetchCart() {
      const res = await fetch('/api/getCart');  //  API endpoint to get cart items
      const data = await res.json();
      console.log("Cart API response: ", data);
      setCartItems(data.items || data.data || []);

         // Fetch weather
    fetch('http://localhost:3000/api/getWeather')
      .then((res) => res.json())
      .then((weather) => setWeatherData(weather))
      .catch((err) => {
        console.error('Weather fetch failed', err);
      });

    }
    fetchCart();
  }, []);

  
  // Calculate total price
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

   const theme = createTheme({
      palette: {
        secondary: {
          main: green[500],
        },
      },
    });

    if (!weather) return <p>Loading...</p>;

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
            <Button color="inherit" onClick={() => router.push('/dashboard')}>Dashboard</Button>
    
          </Toolbar>
        </AppBar>


        {/* Main Content */}
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
          {/* Weather Display */}
          <Typography variant="h5" gutterBottom>
            Today's Temperature: {weather.temp}°C
          </Typography>

        </Container>
      </Box>
    
    
    
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty</Typography>
      ) : (
        cartItems.map((item, index) => (
          <Box key={index} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
            <Typography variant="h6">{item.pname}</Typography>
            <Typography>Price: ${item.price}</Typography>
          </Box>
        ))
      )}
      <Typography variant="h6" sx={{ mt: 3 }}>Total: ${total.toFixed(2)}</Typography>
    <Button
      variant="contained"
      sx={{ mt: 2 }}
      onClick={() => {
        if (confirm(`Confirm checkout for $${total.toFixed(2)}?`)) {
          // Clear the cart state
          setCartItems([]);

          // Also clear the cart on backend
          fetch('/api/clearCart')  // You need to have this API to clear cart in DB
            .then(() => {
              alert('Checkout complete! Your cart is now empty.');
            })
            .catch(() => {
              alert('Checkout complete! But failed to clear backend cart.');
            });
        }
      }}
    >
      Confirm Checkout
    </Button>



    </Container>
    </ThemeProvider>
  );
}

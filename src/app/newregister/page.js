// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol>
//           <li>
//             Get started by editing <code>src/app/page.js</code>.
//           </li>
//           <li>Save and see your changes instantly.</li>
//         </ol>

//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.secondary}
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className={styles.footer}>
//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }


'use client';

import React, { useState, useEffect } from 'react';
import {
  Avatar, Button, TextField, FormControlLabel,
  Checkbox, Link, Container, Box
} from '@mui/material';

export default function Home() {

  const handleSubmit = (event) => {
    console.log("handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let pass = data.get('pass');
    let tel = data.get('tel');
    let address = data.get('address');
    let email2 = data.get('email2');
    let pass2 = data.get('pass2');

    console.log("Sent email: " + email);
    console.log("Sent pass: " + pass);
    console.log("Tel: " + tel);
    console.log("Address: " + address);
    console.log("Confirm Email: " + email2);
    console.log("Confirm Password: " + pass2);

    runDBCallAsync(`http://localhost:3000/api/newregister?email=${email}&pass=${pass}&tel=${tel}&address=${address}&email2=${email2}&pass2=${pass2}`);
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data === "valid") {
      console.log("login is valid!");
    } else {
      console.log("not valid");
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: '100vh' }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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

          <TextField
            margin="normal"
            required
            fullWidth
            id="tel"
            label="Telephone"
            name="tel"
            autoComplete="tel"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="street-address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email2"
            label="Confirm Email"
            name="email2"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="pass2"
            label="Confirm Password"
            name="pass2"
            autoComplete="new-password"
          />


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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





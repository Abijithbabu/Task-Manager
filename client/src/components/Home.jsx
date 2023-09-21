import React from 'react'
import Navbar from './Navbar'
import Layout from './home/Layout'
import { ThemeProvider, createTheme } from "@mui/material";

const Home = () => {
    const theme = createTheme({
      palette: {
        mode: "dark",
        primary: {
          main: "#afaeb2",
        },
        secondary: {
          main: "#213547",
        },
      },
    });
  return (
    <>
 <ThemeProvider theme={theme}>
      <Navbar/>
      <Layout/>
    </ThemeProvider>
    </>
  )
}

export default Home

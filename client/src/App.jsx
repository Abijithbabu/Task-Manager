import { useState } from "react";
import Navbar from "./components/Navbar";
import Layout from './components/home/Layout.jsx' 
import { ThemeProvider, createTheme } from "@mui/material";
import Login from './components/Login'
function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark', 
      primary: {
        main: "#afaeb2",
      },
      secondary: {
        main: "#213547",
      },
    }
  });
  return (
    <>
    <ThemeProvider theme={theme}>
      <Login></Login>
      <Navbar />
      <Layout/>
    </ThemeProvider>
    </>
  );
}

export default App;

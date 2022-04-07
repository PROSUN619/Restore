import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import AbountPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import { Product } from "../../models/Product";
import Header from "./Header";

function App() {

  

  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: palleteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline used to remove extra margin */}
      <CssBaseline />
      <Header  darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        {/* use exact or react will load all component matches with path value*/}
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/catalog' component={Catalog}/>
        <Route path='/catalog/:id' component={ProductDetails}/>
        <Route path='/about' component={AbountPage}/>
        <Route path='/contact' component={ContactPage}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;

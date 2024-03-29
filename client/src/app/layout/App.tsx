import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import { Product } from "../../models/Product";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";


function App() {

  //const {setBasket} = useStoreContext(); //our custom hooks from storecontext
 const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() =>{
      const buyerId = getCookie('buyerId');
      if (buyerId){
        agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
      }
      else{
        setLoading(false);
      }
  },[dispatch]);



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

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message="Initialising app..."/>


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      {/* CssBaseline used to remove extra margin */}
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        {/* use exact or react will load all component matches with path value*/}
        {/* use switch make our route exclusive, only 1 route will load at a time*/}
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route component={NotFound}></Route>
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;

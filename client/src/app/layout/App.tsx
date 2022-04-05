import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Product } from "../../models/Product";
import Header from "./Header";

function App() {
  // const [products, setProducts] = useState([
  //   { name: "product1", price: 100.0 },
  //   { name: "product2", price: 200.0 },
  // ]);
  /*
    //use react hooks
    const [products, setProducts] = useState<Product[]>([]);
  
    //use another react hooks useeffect
    //useeffect called when react component mounted
    useEffect(() => {
      fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => setProducts(data))
    }, []); // use [] to add dependancy  so that when component re render useeffect will not be called
    //any time our state change then component re render and update the state
  */
  /*
    function addProduct() {
      //... means add a product with existing product
      //setProducts([...products,{name: 'product3', price:300.00}]);
      //use with previous state
      setProducts((prevstate) => [
        ...products,
        {
          id: prevstate.length + 101,
          name: "product" + (prevstate.length + 1),
          price: prevstate.length * 100 + 100,
          brand: 'some brand',
          description: 'some description',
          pictureUrl: 'http://picsum.photos/200'
        }
      ]);
    }
    */

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
        {/* <Catalog products={products} addProduct={addProduct} /> */}
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;

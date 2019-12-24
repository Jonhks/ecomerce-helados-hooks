import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify'
import useFetch from './hooks/useFetch'
import TopMenu from './Components/TopMenu'
import Products from './Components/Products'
import { urlAPIProducts, STORAGE_PRODUCTS_CART } from './utils/constants'


 
function App() {

  const products = useFetch(urlAPIProducts, null)
  const [ productsCart, setProductsCart ] = useState([])

  useEffect(() => {
    getProuctsCart()
  }, []);

  const getProuctsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_CART)

    if(idsProducts){
      const idsProductsSplit = idsProducts.split(',')
      setProductsCart(idsProductsSplit)
    } else {
      setProductsCart([])
    }
  }

  const addProductCar = (id, name) => {
    const idsProducts = productsCart
    idsProducts.push(id)
    setProductsCart(idsProducts)
    localStorage.setItem(STORAGE_PRODUCTS_CART, productsCart)
    getProuctsCart()
    toast.success(`${name} añadido al carrito correctamente`)
  }


  return (
    <div className="App">
      <TopMenu productsCart= {productsCart} getProuctsCart={getProuctsCart} products={products}/>
      <h1 className="text-center">Productos</h1>
      <Products products={products} addProductCar={addProductCar} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        draggable
      />
    </div>
  );
}

export default App;

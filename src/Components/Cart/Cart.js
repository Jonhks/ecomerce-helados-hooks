import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'
import { ReactComponent as CartEmpty } from '../../assets/img/cart-empty.svg'
import { ReactComponent as CartFull } from '../../assets/img/cart-full.svg'
import { ReactComponent as Close } from '../../assets/img/close.svg'
import { ReactComponent as Vaciar } from '../../assets/img/garbage.svg'
import { STORAGE_PRODUCTS_CART, BASE_PATH } from '../../utils/constants'


import { removeArrayDuplicates, CountDuplicatesItemsArray, removeItemArray } from '../../utils/arrayFunc';

import './Cart.sass'

export default (props) => {
  const { productsCart, getProuctsCart, products } = props
  const [ cartOpen, setCartOpen] = useState(false)
  const [singleProductsCart, setSingleProductsCart] = useState([])
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const widthCartContent = cartOpen ? 400 : 0

  useEffect( () => {
    const allProductsId = removeArrayDuplicates(productsCart)
    setSingleProductsCart(allProductsId)    
  }, [productsCart])

  useEffect(() => {
    const productData = []
    let totalPrice = 0
    const allProductsId = removeArrayDuplicates(productsCart)
    allProductsId.forEach(productId => {
      const quantity = CountDuplicatesItemsArray(productId, productsCart)
      const productValue = {id: productId, quantity: quantity}
      productData.push(productValue)
    })
    if(!products.loading && products.result){
      products.result.forEach(product => {
        productData.forEach(item =>{
          if(product.id == item.id){
            const totalValue = product.price * item.quantity
            totalPrice += totalValue
          }
        })
      })
    }
    setCartTotalPrice(totalPrice)
  },[productsCart, products]);


  const openCart = () => {
    setCartOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeCart = () => {
    setCartOpen(false)
    document.body.style.overflow = "scroll"
  }

  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCTS_CART)
    getProuctsCart()
  }

  const increaseQuantity = (id) => {
    const arrayItemsCart = productsCart
    arrayItemsCart.push(id)
    localStorage.setItem(STORAGE_PRODUCTS_CART, arrayItemsCart)
    getProuctsCart()
  }

  const decreaseQuantity = (id) => {
    const arrayItemsCart = productsCart
    const result = removeItemArray(arrayItemsCart, id.toString())
    localStorage.setItem(STORAGE_PRODUCTS_CART, result)
    getProuctsCart()
  }


  return(
    <>
      <Button variant="link" className="cart" >
        {productsCart.length > 0 ? (
        <CartFull onClick={openCart} />
        ): (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart-content" style= {{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart= {emptyCart} />
        <div className ="cart-content__products">
          {singleProductsCart.map((idProductsCart, index )=>(
            <CartContentProducts key={index} products={products} idsProductsCart={productsCart} idProductCart={idProductsCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice}/> 
      </div>
    </>
  )
}


const CartContentHeader = props => {
  const {closeCart, emptyCart} = props
  return (
    <div className="cart-content_header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito</h2>
      </div>
      <Button variant="link" >
        Vaciar
        <Vaciar onClick={emptyCart}/>
      </Button>
    </div>
  )
}

const CartContentProducts = props => {
  const { products: {loading, result}, idsProductsCart, idProductCart, increaseQuantity, decreaseQuantity } = props

  if(!loading && result){
    return result.map( (product, index) =>{
      if(idProductCart == product.id) {
        const quantity = CountDuplicatesItemsArray(product.id, idsProductsCart)
        return (
          <RenderProduct key={index} product={product} quantity={quantity} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity}/>
        )
      }
    })
  } else {
    return null
  } 
}

const RenderProduct = props => {
  const { product, quantity, increaseQuantity, decreaseQuantity } = props
  return (
    <div className ="cart-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
      <div className = "cart-content__product-info">
        <div>
          <h3>{product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)}$/Unidad </p>
        </div>
        <div>
          <p>{quantity} unidades en el carrito.</p>
          <div>
            <button onClick={()=> increaseQuantity(product.id)}>+</button>
            <button onClick={()=> decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CartContentFooter = props => {
const { cartTotalPrice } = props
return (
  <div className ="cart-content__fotter">
    <div>
      <p>Total a pagar: </p>  
      <p>{cartTotalPrice.toFixed(2)}$</p>
    </div>
    <Button>Pagar</Button>
  </div>
)
} 
import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import { ReactComponent as CartEmpty } from '../../assets/img/cart-empty.svg'
import { ReactComponent as CartFull } from '../../assets/img/cart-full.svg'
import { ReactComponent as Close } from '../../assets/img/close.svg'
import { ReactComponent as Vaciar } from '../../assets/img/garbage.svg'
import { STORAGE_PRODUCTS_CART } from '../../utils/constants'


import './Cart.sass'

export default (props) => {
  const { productsCart, getProuctsCart } = props
  const [ cartOpen, setCartOpen] = useState(false)
  const widthCartContent = cartOpen ? 400 : 0


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
        Todos los productos
      </div>
    </>
  )
}


const CartContentHeader = (props) => {
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
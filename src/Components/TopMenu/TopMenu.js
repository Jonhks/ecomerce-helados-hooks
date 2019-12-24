import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap'
import Cart from '../Cart'
import { ReactComponent as Logo } from '../../assets/img/logo.svg'

import './TopMenu.sass'

export default (props) => {
  const { productsCart, getProuctsCart, products } = props
  return (
    <Navbar
      bg="dark" 
      variant="dark"
      className="top-menu"
    >
      <Container>
        <BrandNav />
        <MenuNav />
        <Cart productsCart={productsCart} getProuctsCart={getProuctsCart} products={products}/>
      </Container>
    </Navbar>
  )
}

const BrandNav = () => {
  return (
    <Navbar.Brand>
      <Logo />
      <h2>La casa del helado</h2>
    </Navbar.Brand>
  )
}


const MenuNav = () => {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Mascotas</Nav.Link>
    </Nav>
  )
}
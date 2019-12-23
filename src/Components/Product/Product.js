import React from 'react';
import { Col, Card, Button } from 'react-bootstrap'
import { BASE_PATH } from '../../utils/constants'

import './Product.sass'


export default (props) => {
  const { product, addProductCar } = props
  return (
    <Col xs={3} className="product">
      <Card className="shadow-lg p-3 mb-3 bg-white rounded">
        <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price.toFixed(2)}$ / Unidad</Card.Text>
          <Button onClick={ ()=> addProductCar(product.id, product.name)}>
            Añadir al carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  )
}
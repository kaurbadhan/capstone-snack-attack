import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeFromCart, changeCartItemQty } from "../services/cartAction";

export default function CartScreen () {
  const cartItemsInfo = useSelector((state) => state.cart);
  const { cartItems } = cartItemsInfo;
  const dispatch = useDispatch();

  // check the products in the cart
  console.log(cartItems)

  const HandleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  }


  const HandleChangeItemQty = (id, qty) => {
    dispatch(changeCartItemQty(id, qty));
  }

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.qty *item.price, 0);



  if(cartItems.length === 0){
    return <div> Your shopping cart is empty. </div>
  }
    
  return (

    <Row>
      <Col md={12}>
        
        <h3>Shopping Cart</h3>

        {
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                <Col md={2}>
                    <Image src={item.image} alt={item.title} fluid rounded /> 
                </Col>

                <Col md={2}>
                    <Link to={`/product/${item._id}`} >{item.title}</Link> 
                </Col>

                <Col md={1}>
                  ${item.price} 
                </Col>

                <Col md={1}>
                  <Button onClick={
                      () => {
                        HandleChangeItemQty(item._id, item.qty - 1);
                      } 
                    }
                    disabled={item.qty === 1}
                  >-</Button>                  
                </Col>


                <Col md={1}>
                  {item.qty} 
                </Col>

                <Col md={1}>
                  <Button onClick={
                      () => {
                        HandleChangeItemQty(item._id, item.qty + 1);
                      } 
                    }
                    disabled={item.qty == item.inStock}
                  >+</Button>                  
                </Col>

                <Col md={2}>
                  Total Price: ${totalPrice} 
                </Col>

                <Col md={2}>
                  <Button onClick={
                      () => {
                        HandleRemoveFromCart(item._id);
                      } 
                    }
                  >
                  Remove
                  </Button>
                </Col>

                </Row>

              </ListGroup.Item>

            ))}


          </ListGroup>  
         
        }

        <Button >Proceed to checkout</Button>
      </Col>
    </Row>

  )
  }
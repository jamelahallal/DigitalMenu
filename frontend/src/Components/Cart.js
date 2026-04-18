import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = ({ show, handleClose, cartItems, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    handleClose(); // Close the cart drawer
    navigate('/checkout'); 
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <FaShoppingCart className="me-2" /> Shopping Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartItems.length === 0 ? (
          <p className="text-muted text-center py-5">Your cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item d-flex justify-content-between align-items-center">
                <div className="flex-grow-1">
                  <h6 className="mb-0">{item.name}</h6>
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </Button>
                  <span className="fw-bold" style={{ minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                  <Button 
                    size="sm" 
                    variant="outline-secondary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline-danger"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            ))}
            <div className="mt-4 pt-3 border-top">
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">${total.toFixed(2)}</strong>
              </div>
              <Button 
                variant="success" 
                className="w-100"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Cart;
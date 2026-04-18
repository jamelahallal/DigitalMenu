import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup, Badge } from 'react-bootstrap';
import { FaCreditCard, FaMoneyBillWave, FaCheckCircle, FaArrowLeft, FaReceipt} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Load cart items
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (savedCart.length === 0) {
      // Redirect to home if cart is empty
      navigate('/');
    }
    setCartItems(savedCart);
  }, [navigate]);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + tax;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const orderNumber = generateOrderNumber();
      const order = {
        orderNumber: orderNumber,
        date: new Date().toISOString(),
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`
        },
        items: [...cartItems],
        subtotal: totalAmount,
        tax: tax,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
        status: 'Confirmed'
      };
      
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      existingOrders.unshift(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      // Clear the cart
      localStorage.removeItem('cart');
      
      setOrderDetails(order);
      setOrderComplete(true);
      setIsProcessing(false);
    }, 2000);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/dashboard');
  };

  if (orderComplete && orderDetails) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg border-0 text-center">
              <Card.Body className="p-5">
                <div className="mb-4">
                  <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{ width: '80px', height: '80px' }}>
                    <FaCheckCircle size={50} className="text-white" />
                  </div>
                  <h2 className="mb-2">Order Received! 🎉</h2>
                  <p className="text-muted">Thank you for your order</p>
                </div>
                
                <Alert variant="success" className="text-start">
                  <strong>Order Number:</strong> {orderDetails.orderNumber}<br />
                  <strong>Date:</strong> {new Date(orderDetails.date).toLocaleString()}<br />
                  <strong>Status:</strong> <Badge bg="success">{orderDetails.status}</Badge>
                </Alert>
                
                <Card className="mb-4 text-start">
                  <Card.Header>
                    <strong>Order Summary</strong>
                  </Card.Header>
                  <Card.Body>
                    {orderDetails.items.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between mb-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <hr />
                    <div className="d-flex justify-content-between mb-1">
                      <span>Subtotal:</span>
                      <span>${orderDetails.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-1">
                      <span>Tax (10%):</span>
                      <span>${orderDetails.tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>Total Paid</strong>
                      <strong className="text-primary">${orderDetails.totalAmount.toFixed(2)}</strong>
                    </div>
                  </Card.Body>
                </Card>
                
                <Card className="mb-4 text-start">
                  <Card.Header>
                    <strong>Delivery Details</strong>
                  </Card.Header>
                  <Card.Body>
                    <p className="mb-1"><strong>{orderDetails.customer.name}</strong></p>
                    <p className="mb-1">{orderDetails.customer.address}</p>
                    <p className="mb-1">{orderDetails.customer.email}</p>
                    <p className="mb-0">{orderDetails.customer.phone}</p>
                  </Card.Body>
                </Card>
                
                <div className="d-flex gap-3 justify-content-center">
                  <Button variant="outline-primary" onClick={handleBackToMenu}>
                    <FaArrowLeft className="me-2" /> Back to Menu
                  </Button>
                  <Button variant="primary" onClick={handleViewOrders}>
                    <FaReceipt className="me-2" /> View My Orders
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button 
        variant="outline-secondary" 
        className="mb-4"
        onClick={() => navigate('/')}
      >
        <FaArrowLeft className="me-2" /> Back to Menu
      </Button>
      
      <Row>
        <Col lg={7}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Checkout Information</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmitOrder}>
                <h6 className="mb-3">Personal Information</h6>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>ZIP Code *</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="12345"
                        isInvalid={!!errors.zipCode}
                      />
                      <Form.Control.Feedback type="invalid">{errors.zipCode}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St"
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>City *</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>

                <h6 className="mb-3">Payment Method</h6>
                <div className="mb-4">
                  <Form.Check
                    type="radio"
                    label="Credit / Debit Card"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                </div>

                {paymentMethod === 'card' && (
                  <>
                    <h6 className="mb-3">Card Details</h6>
                    <Form.Group className="mb-3">
                      <Form.Label>Card Number *</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        isInvalid={!!errors.cardNumber}
                      />
                      <Form.Control.Feedback type="invalid">{errors.cardNumber}</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Expiry Date *</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            isInvalid={!!errors.expiryDate}
                          />
                          <Form.Control.Feedback type="invalid">{errors.expiryDate}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>CVV *</Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            isInvalid={!!errors.cvv}
                          />
                          <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}

                <Button 
                  type="submit" 
                  variant="success" 
                  size="lg" 
                  className="w-100 mt-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      <FaCreditCard className="me-2" /> Place Order (${grandTotal.toFixed(2)})
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
            <Card.Header className="bg-secondary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              {cartItems.length === 0 ? (
                <p className="text-muted text-center py-4">Your cart is empty</p>
              ) : (
                <>
                  <ListGroup variant="flush">
                    {cartItems.map((item, idx) => (
                      <ListGroup.Item key={idx} className="d-flex justify-content-between">
                        <div>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="text-muted">Qty: {item.quantity}</small>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <hr />
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Delivery Fee:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-primary fs-5">${grandTotal.toFixed(2)}</strong>
                  </div>
                  <small className="text-muted d-block mt-2 text-center">
                    <FaMoneyBillWave className="me-1" /> Secure payment processed
                  </small>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
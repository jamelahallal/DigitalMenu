import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Badge } from 'react-bootstrap';
import { FaShoppingBag, FaDollarSign, FaReceipt } from 'react-icons/fa';

const Dashboard = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setCart(savedCart);
    setOrders(savedOrders);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalSpent = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalOrders = orders.length;

  const getStatusBadge = (status) => {
    const colors = {
      'Confirmed': 'success',
      'Processing': 'warning',
      'Delivered': 'info',
      'Cancelled': 'danger'
    };
    return <Badge bg={colors[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Dashboard</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaShoppingBag size={30} className="text-primary mb-2" />
              <h6 className="text-muted">Current Order</h6>
              <h3>{totalItems} items</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaDollarSign size={30} className="text-success mb-2" />
              <h6 className="text-muted">Current Order Total </h6>
              <h3>${totalSpent.toFixed(2)}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaReceipt size={30} className="text-info mb-2" />
              <h6 className="text-muted">Orders Placed</h6>
              <h3>{totalOrders}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Order History */}
      {orders.length > 0 && (
        <Card className="shadow-sm mb-4">
          <Card.Header>
            <h5 className="mb-0">📦 Order History</h5>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <Table hover>
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, idx) => (
                    <tr key={idx}>
                      <td>
                        <small className="fw-bold">{order.orderNumber}</small>
                      </td>
                      <td>
                        <small>{new Date(order.date).toLocaleDateString()}</small>
                      </td>
                      <td>
                        <small>
                          {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                        </small>
                      </td>
                      <td>
                        <strong>${order.totalAmount.toFixed(2)}</strong>
                      </td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <small>{order.paymentMethod}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Current Cart */}
      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">🛒 Current Cart</h5>
        </Card.Header>
        <Card.Body>
          {cart.length === 0 ? (
            <p className="text-muted text-center py-4">Your cart is empty. Start adding items from the menu!</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="d-flex justify-content-between align-items-center p-3 mb-2 rounded" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
                <div>
                  <strong>{item.name}</strong>
                  <div className="text-muted small">${item.price.toFixed(2)} each</div>
                </div>
                <div className="text-end">
                  <span className="badge bg-primary me-2">Qty: {item.quantity}</span>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
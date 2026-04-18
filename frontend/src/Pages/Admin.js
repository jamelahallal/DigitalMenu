import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Table, Modal, Alert, Navbar, Nav } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaSignOutAlt, FaUserShield } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'food',
    description: '',
    image: ''
  });

  // Check if logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    const email = localStorage.getItem('adminEmail');
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
    } else {
      setAdminEmail(email || 'Admin');
      loadProducts();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('adminLoginTime');
    navigate('/login');
  };

  const loadProducts = () => {
    const stored = JSON.parse(localStorage.getItem('menuItems')) || [];
    setProducts(stored);
  };

  const saveProducts = (updatedProducts) => {
    localStorage.setItem('menuItems', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      description: form.description || 'Delicious item',
      image: form.image || getDefaultImage(form.category),
      updatedAt: new Date().toISOString()
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      setSuccessMessage(`${newProduct.name} has been updated successfully!`);
    } else {
      updatedProducts = [...products, newProduct];
      setSuccessMessage(`${newProduct.name} has been added to the menu!`);
    }

    saveProducts(updatedProducts);
    resetForm();
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: product.image || ''
    });
    setShowModal(true);
  };

  const handleDelete = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(p => p.id !== productToDelete.id);
      saveProducts(updatedProducts);
      setSuccessMessage(`${productToDelete.name} has been removed from the menu.`);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      price: '',
      category: 'food',
      description: '',
      image: ''
    });
    setEditingProduct(null);
  };

  const getDefaultImage = (category) => {
    const defaultImages = {
      food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
      desserts: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop'
    };
    return defaultImages[category] || defaultImages.food;
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const getCategoryBadge = (category) => {
    const colors = {
      food: 'primary',
      drinks: 'success',
      desserts: 'warning'
    };
    return `badge bg-${colors[category] || 'secondary'}`;
  };

  return (
    <Container fluid className="py-4">
      {/* Success Alert */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible className="position-fixed top-0 end-0 m-3" style={{ zIndex: 9999, minWidth: '300px' }}>
          <Alert.Heading className="fs-6">Success!</Alert.Heading>
          <p className="mb-0">{successMessage}</p>
        </Alert>
      )}

      {/* Admin Navbar */}
      <Navbar className="mb-4 rounded shadow-sm" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center gap-2">
            <FaUserShield className="text-primary" />
            <span>Admin Panel</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <span className="navbar-text me-3">
              <small className="text-muted">Logged in as: <strong>{adminEmail}</strong></small>
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout} className="d-flex align-items-center gap-2">
              <FaSignOutAlt /> Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <h2 className="mb-1">Menu Management</h2>
              <p className="text-muted">Manage all menu items - Add, Edit, or Remove any item</p>
            </div>
            <Button variant="primary" onClick={openAddModal} className="d-flex align-items-center gap-2">
              <FaPlus /> Add New Item
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">🍽️ All Menu Items ({products.length})</h5>
            </Card.Header>
            <Card.Body>
              {products.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-3">No items in menu</p>
                  <Button variant="outline-primary" onClick={openAddModal}>
                    <FaPlus className="me-2" /> Add Your First Item
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '80px' }}>Image</th>
                        <th>Name</th>
                        <th style={{ width: '120px' }}>Category</th>
                        <th style={{ width: '100px' }}>Price</th>
                        <th>Description</th>
                        <th style={{ width: '130px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>
                            <img 
                              src={product.image} 
                              alt={product.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                              onError={(e) => { e.target.src = getDefaultImage(product.category); }}
                            />
                          </td>
                          <td>
                            <strong>{product.name}</strong>
                            {product.updatedAt && (
                              <div>
                                <small className="text-muted">
                                  Updated: {new Date(product.updatedAt).toLocaleDateString()}
                                </small>
                              </div>
                            )}
                          </td>
                          <td>
                            <span className={getCategoryBadge(product.category)} style={{ padding: '5px 10px', borderRadius: '20px', fontSize: '12px' }}>
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </span>
                          </td>
                          <td className="text-primary fw-bold">${product.price.toFixed(2)}</td>
                          <td>
                            <small className="text-muted">{product.description.substring(0, 60)}...</small>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => handleEdit(product)}
                                title="Edit item"
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => confirmDelete(product)}
                                title="Delete item"
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => { setShowModal(false); resetForm(); }} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProduct ? (
              <><FaEdit className="me-2" /> Edit Item</>
            ) : (
              <><FaPlus className="me-2" /> Add New Item</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Item Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Spicy Chicken Sandwich"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm({...form, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    required
                  >
                    <option value="food">🍔 Food</option>
                    <option value="drinks">🥤 Drinks</option>
                    <option value="desserts">🍰 Desserts</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={(e) => setForm({...form, image: e.target.value})}
                  />
                  <Form.Text className="text-muted">
                    Leave empty for default category image
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your delicious item..."
                value={form.description}
                onChange={(e) => setForm({...form, description: e.target.value})}
              />
            </Form.Group>

            {form.image && (
              <div className="mt-2">
                <Form.Label>Image Preview:</Form.Label>
                <div>
                  <img 
                    src={form.image} 
                    alt="Preview" 
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShowModal(false); resetForm(); }}>
              <FaTimes className="me-1" /> Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FaSave className="me-1" /> {editingProduct ? 'Update Item' : 'Add Item'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
          <p className="text-muted small">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            <FaTrash className="me-1" /> Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Admin;
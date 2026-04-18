import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import MenuCard from '../Components/MenuCard';
import Cart from '../Components/Cart';
import SearchBar from '../Components/SearchBar';
import ThemeToggle from '../Components/Themetoggle';
import { getAllItems, initializeMenuItems } from '../Data/MenuData';

const MainMenu = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Initialize menu items and load them
  useEffect(() => {
    initializeMenuItems();
    loadItems();
    
    const handleStorageChange = () => {
      loadItems();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadItems = () => {
    const allItems = getAllItems();
    setItems(allItems);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    setCartItems(prev => {
      const exist = prev.find(i => i.id === item.id);
      if (exist) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else {
      setCartItems(prev =>
        prev.map(i => (i.id === id ? { ...i, quantity: qty } : i))
      );
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-layout">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setShowCart={setShowCart}
        cartItemCount={cartItemCount}
      />

      <div className="main-content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <Container fluid className="px-0">
          <Row>
            {filteredItems.length === 0 ? (
              <div className="text-center py-5">
                <h4>No items found</h4>
                <p className="text-muted">Try adjusting your search or add items in admin panel</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <Col key={item.id} lg={4} md={6} sm={6} xs={12} className="mb-4">
                  <MenuCard item={item} onAddToCart={addToCart} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>

      <Cart
        show={showCart}
        handleClose={() => setShowCart(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default MainMenu;
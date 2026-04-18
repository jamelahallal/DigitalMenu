import React, { useState } from 'react';
import { FaUtensils, FaShoppingCart, FaUser, FaUserShield, FaCoffee, FaIceCream, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = ({ activeCategory, setActiveCategory, setShowCart, cartItemCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = [
    { key: 'all', label: 'All Items', icon: <FaUtensils /> },
    { key: 'drinks', label: 'Drinks', icon: <FaCoffee /> },
    { key: 'food', label: 'Food', icon: <FaUtensils /> },
    { key: 'desserts', label: 'Desserts', icon: <FaIceCream /> }
  ];

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="d-md-none mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <h2 className="logo">🍽️ FlavorHub</h2>
        
        <div className="sidebar-section">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className={`nav-link ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.key); closeMenu(); }}
            >
              <span className="icon">{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </div>

        <hr />

        <div className="sidebar-section">
          <div className="nav-link" onClick={() => { setShowCart(true); closeMenu(); }}>
            <span className="icon"><FaShoppingCart /></span>
            Cart {cartItemCount > 0 && `(${cartItemCount})`}
          </div>
          <div className="nav-link" onClick={() => window.location.href = '/dashboard'}>
            <span className="icon"><FaUser /></span>
            Dashboard
          </div>
          <div className="nav-link" onClick={() => window.location.href = '/login'}>
            <span className="icon"><FaUserShield /></span>
            Admin
          </div>
        </div>
      </div>

      {/* Overlay */}
      {mobileOpen && <div className="mobile-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default Sidebar;
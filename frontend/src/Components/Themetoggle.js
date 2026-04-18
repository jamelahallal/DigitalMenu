import React from 'react';
import { Button } from 'react-bootstrap';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <Button
      variant={darkMode ? 'light' : 'dark'}
      onClick={toggleDarkMode}
      className="rounded-circle d-flex align-items-center justify-content-center"
      style={{ width: '45px', height: '45px', position: 'fixed', bottom: '24px', right: '24px', zIndex: 1100, boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
      title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </Button>
  );
};

export default ThemeToggle;
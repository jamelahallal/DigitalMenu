import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import MainMenu from './Pages/MainMenu';
import Admin from './Pages/Admin';
import Dashboard from './Pages/Dashboard';
import CheckoutPage from './Pages/Checkout';
import Login from './Components/Login';

// Theme Context
export const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export const useTheme = () => useContext(ThemeContext);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
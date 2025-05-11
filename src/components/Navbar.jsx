
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();
  const { selectedAlgorithm } = useGraphContext();

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <Link to="/water-network-optimization" className="navbar-logo">
              <div className="logo-circle">
                <div className="logo-water"></div>
              </div>
              <span className="logo-text">Water Distribution Optimizer</span>
            </Link>
          </div>
          
          <nav className="navbar-nav">
            <Link
              to="/water-network-optimization"
              className={`nav-link ${isActive('/water-network-optimization') || isActive('/algorithms') ? 'nav-link-active' : ''}`}
            >
              Water Network Optimization
            </Link>
            
            <Link
              to="/results"
              className={`nav-link ${isActive('/results') ? 'nav-link-active' : ''}`}
            >
              Results
            </Link>
            
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'nav-link-active' : ''}`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

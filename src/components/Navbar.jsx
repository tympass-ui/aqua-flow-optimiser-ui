
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';

const Navbar = () => {
  const location = useLocation();
  const { selectedAlgorithm } = useGraphContext();

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-water-dark text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/algorithms" className="flex items-center">
              <div className="h-8 w-8 mr-2 bg-white rounded-full flex items-center justify-center">
                <div className="h-6 w-6 bg-water animate-flow rounded-full"></div>
              </div>
              <span className="font-bold text-lg">Water Distribution Optimizer</span>
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link
              to="/algorithms"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/algorithms') ? 'bg-water text-white' : 'hover:bg-water-light hover:text-water-dark'
              }`}
            >
              Algorithms
            </Link>
            
            <Link
              to="/results"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/results') ? 'bg-water text-white' : 'hover:bg-water-light hover:text-water-dark'
              }`}
            >
              Results
            </Link>
            
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about') ? 'bg-water text-white' : 'hover:bg-water-light hover:text-water-dark'
              }`}
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

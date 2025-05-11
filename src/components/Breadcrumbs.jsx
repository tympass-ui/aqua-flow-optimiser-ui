
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import { ChevronRight } from 'lucide-react';
import '../styles/breadcrumbs.css';

const Breadcrumbs = () => {
  const location = useLocation();
  const { selectedAlgorithm } = useGraphContext();
  
  // Generate breadcrumbs based on current path
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(path => path);
    let breadcrumbs = [{ name: 'Home', path: '/' }];
    
    if (paths.length > 0) {
      paths.forEach((path, index) => {
        let name = path;
        let fullPath = `/${paths.slice(0, index + 1).join('/')}`;
        
        // Map URLs to user-friendly names
        if (path === 'water-network-optimization' || path === 'algorithms') {
          name = 'Water Network Optimization';
          fullPath = '/water-network-optimization';
        } else if (path === 'results') {
          name = 'Results';
        } else if (path === 'about') {
          name = 'About';
        } else {
          name = path.charAt(0).toUpperCase() + path.slice(1);
        }
        
        breadcrumbs.push({ name, path: fullPath });
      });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="breadcrumbs">
      <div className="container">
        <div className="breadcrumbs-list">
          {breadcrumbs.map((breadcrumb, index) => (
            <div key={breadcrumb.path} className="breadcrumb-item">
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link to={breadcrumb.path} className="breadcrumb-link">
                    {breadcrumb.name}
                  </Link>
                  <span className="breadcrumb-separator">
                    <ChevronRight size={16} />
                  </span>
                </>
              ) : (
                <span className="breadcrumb-link breadcrumb-active">
                  {breadcrumb.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;

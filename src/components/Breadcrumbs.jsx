
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import { ChevronRight } from 'lucide-react';

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
        
        // Special case for algorithms page to show selected algorithm
        if ((path === 'water-network-optimization' || path === 'algorithms') && selectedAlgorithm) {
          const algorithmNames = {
            fordFulkerson: 'Optimize Water Flow',
            mst: 'Cost-Effective Pipeline Design',
            dijkstra: 'Efficient Water Routing'
          };
          breadcrumbs.push({ name, path: fullPath });
          breadcrumbs.push({ 
            name: algorithmNames[selectedAlgorithm] || selectedAlgorithm, 
            path: `${fullPath}#${selectedAlgorithm}` 
          });
          return;
        }
        
        breadcrumbs.push({ name, path: fullPath });
      });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = getBreadcrumbs();
  
  return (
    <div className="bg-gray-50 py-2 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm text-gray-600">
          {breadcrumbs.map((breadcrumb, index) => (
            <React.Fragment key={breadcrumb.path}>
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-water-dark">{breadcrumb.name}</span>
              ) : (
                <Link 
                  to={breadcrumb.path}
                  className="hover:text-water-dark transition-colors"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;

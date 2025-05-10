
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Water Distribution Optimization
          </h1>
          <p className="text-xl text-gray-600">
            Smart city solutions for efficient water resource management
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-water-dark mb-4">
            How to Use This Tool
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-water-light rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-water-dark font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Define Your Water Network
                </h3>
                <p className="text-gray-600">
                  Input the nodes (representing water sources, junctions, and destinations) and edges (representing pipes with capacity, cost, or distance) of your water distribution network.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-water-light rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-water-dark font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Choose an Optimization Algorithm
                </h3>
                <p className="text-gray-600">
                  Select one of our three algorithms depending on your needs:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
                  <li><strong>Ford-Fulkerson</strong>: Maximize water flow through your network</li>
                  <li><strong>Minimum Spanning Tree</strong>: Minimize infrastructure costs</li>
                  <li><strong>Dijkstra's</strong>: Find shortest paths for water delivery</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-water-light rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">
                <span className="text-water-dark font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  View and Analyze Results
                </h3>
                <p className="text-gray-600">
                  After submitting your data, you'll see visualization of your network and detailed optimization results that help you make informed decisions about your water distribution system.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/algorithms"
              className="inline-flex items-center px-6 py-3 bg-water hover:bg-water-dark text-white font-medium rounded-lg transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
        
        <div className="bg-water-light bg-opacity-30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Why Optimize Water Distribution?
          </h2>
          <p className="text-gray-600">
            Efficient water distribution is crucial for sustainable urban development. Our tool helps city planners and water management professionals optimize their networks to reduce waste, minimize costs, and ensure reliable delivery to all areas.
          </p>
          <p className="text-gray-600 mt-2">
            By applying graph theory and optimization algorithms, we can model complex water networks and find the most efficient solutions for real-world challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

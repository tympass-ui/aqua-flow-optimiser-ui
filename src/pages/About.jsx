
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">About This Project</h1>
          <div className="h-1 w-20 bg-water-dark"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="h-14 w-14 bg-water-light rounded-full flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-water-dark rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Purpose</h2>
            <p className="text-gray-600">
              This web application aims to optimize water distribution networks in smart cities by applying graph algorithms to model and solve complex flow, cost, and routing problems.
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="h-14 w-14 bg-water-light rounded-full flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-water-dark rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Methods</h2>
            <p className="text-gray-600">
              We use graph theory to represent water networks as nodes (sources, junctions, destinations) and edges (pipes) with properties like capacity, cost, and distance.
            </p>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="h-14 w-14 bg-water-light rounded-full flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-water-dark rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Data</h2>
            <p className="text-gray-600">
              The application uses sample datasets that are representative of real-world water distribution networks, but does not connect to real-time sensors or IoT devices.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Algorithms</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-water-dark mb-2">Ford-Fulkerson Algorithm</h3>
              <p className="text-gray-600 mb-4">
                The Ford-Fulkerson algorithm calculates the maximum possible flow through a network from a source to a sink.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Applications in Water Distribution:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Determine the maximum water flow capacity of your distribution network</li>
                  <li>Identify bottlenecks in the system that limit overall flow</li>
                  <li>Plan capacity upgrades by simulating changes to the network</li>
                  <li>Optimize water distribution during peak demand periods</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-water-dark mb-2">Minimum Spanning Tree (MST)</h3>
              <p className="text-gray-600 mb-4">
                MST algorithms (Prim's and Kruskal's) find the subset of edges that connect all nodes with the minimum total cost.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Applications in Water Distribution:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Design cost-efficient pipe layouts for new water infrastructure</li>
                  <li>Optimize existing networks by identifying redundant or inefficient connections</li>
                  <li>Plan phased construction of water distribution systems</li>
                  <li>Minimize material and installation costs in network expansion</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-water-dark mb-2">Dijkstra's Algorithm</h3>
              <p className="text-gray-600 mb-4">
                Dijkstra's algorithm finds the shortest path between two points in a graph, accounting for the weight of each edge.
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Applications in Water Distribution:</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Find the shortest or most efficient route for water delivery</li>
                  <li>Reduce transit time to improve water quality and freshness</li>
                  <li>Plan maintenance routes that minimize service disruptions</li>
                  <li>Optimize pressure zones and pump operations along distribution paths</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-water-light bg-opacity-30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technologies Used</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Frontend</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>React.js for building the user interface components</li>
                <li>JavaScript as the primary programming language</li>
                <li>React Router for navigation and routing</li>
                <li>Recharts for data visualization and graphs</li>
                <li>Tailwind CSS for styling and responsive design</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Algorithms</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Graph theory implementation in JavaScript</li>
                <li>Ford-Fulkerson for maximum flow computation</li>
                <li>Prim's algorithm for minimum spanning trees</li>
                <li>Dijkstra's algorithm for shortest path finding</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              <strong>Note:</strong> This is a simulation tool that uses representative datasets rather than real-time data. It is designed for educational purposes and planning scenarios, not for controlling actual water systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Target, DollarSign, Building } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏙️ Optimize Urban Water Flow Using Smart Algorithms
          </h1>
          <p className="text-xl text-gray-600">
            Smart city solutions for efficient water resource management
          </p>
        </div>
        
        {/* Three-step guide */}
        <div className="bg-water-light bg-opacity-30 rounded-lg p-6 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border-t-4 border-t-water">
              <CardContent className="pt-6">
                <div className="text-center mb-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-water-light text-water-dark mb-3">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-lg font-semibold">Upload/Enter Your Water Network</h3>
                </div>
                <p className="text-gray-700 text-center">
                  Define your network's nodes and connections with capacity, distance, or cost attributes
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-t-4 border-t-water">
              <CardContent className="pt-6">
                <div className="text-center mb-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-water-light text-water-dark mb-3">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-lg font-semibold">Select The Optimization Method</h3>
                </div>
                <p className="text-gray-700 text-center">
                  Choose from flow optimization, cost-effective design, or efficient routing solutions
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-t-4 border-t-water">
              <CardContent className="pt-6">
                <div className="text-center mb-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-water-light text-water-dark mb-3">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-lg font-semibold">View Optimization Results</h3>
                </div>
                <p className="text-gray-700 text-center">
                  See flow patterns, cost savings, and optimal routing to improve your water network
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Key features section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Key Monitoring Features
          </h2>
          
          <div className="space-y-6">
            <Card className="border-l-4 border-l-water">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="bg-water-light rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    <span className="text-water-dark text-2xl font-bold">01</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Monitor Flow and Pressure</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  See water flow rates and levels across your network. This allows for quick identification 
                  of areas with unusual flow patterns or low pressure, potentially indicating leaks or blockages.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-l-4 border-l-water">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="bg-water-light rounded-full h-12 w-12 flex items-center justify-center mr-4">
                    <span className="text-water-dark text-2xl font-bold">02</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Network Optimization</h3>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Apply powerful graph algorithms to optimize your water distribution network, finding the most efficient 
                  paths, minimizing costs, and maximizing flow to all areas of your system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Benefits of Water Management Dashboard
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-water-light flex items-center justify-center mb-4 mx-auto">
                  <Droplet className="h-8 w-8 text-water" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Minimize Water Loss</h3>
                <p className="text-gray-600">
                  Data from your water management dashboard helps you identify leaks and blockages quickly, preventing wasted 
                  resources and saving on water bills.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-water-light flex items-center justify-center mb-4 mx-auto">
                  <Target className="h-8 w-8 text-water" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Targeted Maintenance</h3>
                <p className="text-gray-600">
                  Focus your repair and maintenance efforts on areas with problems, optimizing your team's time and resources, 
                  leading to reduced overall maintenance costs.
                </p>
              </div>
            </Card>
            
            <Card className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="w-16 h-16 rounded-full bg-water-light flex items-center justify-center mb-4 mx-auto">
                  <DollarSign className="h-8 w-8 text-water" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Optimize Spending</h3>
                <p className="text-gray-600">
                  Data-driven insights allow you to make informed decisions about infrastructure upgrades and maintenance 
                  schedules, helping you prioritize investments.
                </p>
              </div>
            </Card>
          </div>
        </div>
        
        {/* How to use section */}
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
                  Select one of our three optimization methods depending on your needs:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 text-gray-600">
                  <li><strong>Optimize Water Flow</strong>: Maximize water flow through your network</li>
                  <li><strong>Cost-Effective Pipeline Design</strong>: Minimize infrastructure costs</li>
                  <li><strong>Efficient Water Routing</strong>: Find shortest paths for water delivery</li>
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
              to="/water-network-optimization"
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

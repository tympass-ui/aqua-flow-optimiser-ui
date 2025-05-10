import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import { fordFulkerson, primMST, dijkstra } from '../utils/graphAlgorithms';
import { toast } from 'sonner';
import { Droplet, BarChart, CircuitBoard } from 'lucide-react';

const Algorithms = () => {
  const navigate = useNavigate();
  const { 
    processNodes, 
    processEdges, 
    setAlgorithmResults,
    selectedAlgorithm, 
    setSelectedAlgorithm 
  } = useGraphContext();
  
  // Form states
  const [nodesInput, setNodesInput] = useState('');
  const [edgesInput, setEdgesInput] = useState('');
  const [sourceNode, setSourceNode] = useState('');
  const [sinkNode, setSinkNode] = useState('');
  const [nodeOptions, setNodeOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Process nodes input to generate dropdown options
  useEffect(() => {
    if (nodesInput) {
      const nodes = nodesInput.split(',').map(node => node.trim()).filter(node => node !== '');
      setNodeOptions(nodes);
      
      // Set default source and sink if available
      if (nodes.length > 0 && !sourceNode) {
        setSourceNode(nodes[0]);
      }
      if (nodes.length > 1 && !sinkNode) {
        setSinkNode(nodes[nodes.length - 1]);
      }
    } else {
      setNodeOptions([]);
    }
  }, [nodesInput]);
  
  // Examples for each algorithm
  const examples = {
    fordFulkerson: {
      nodes: 'Reservoir A,Junction B,Junction C,Tank D,Pump E,Tank F',
      edges: 'Reservoir A Junction B 10\nReservoir A Junction C 8\nJunction B Junction C 2\nJunction B Tank D 4\nJunction B Pump E 8\nJunction C Pump E 9\nTank D Tank F 10\nPump E Tank F 10',
    },
    mst: {
      nodes: 'Reservoir A,Junction B,Junction C,Tank D,Tank E',
      edges: 'Reservoir A Junction B 4\nReservoir A Junction C 8\nJunction B Junction C 3\nJunction B Tank D 5\nJunction C Tank D 2\nJunction C Tank E 7\nTank D Tank E 6',
    },
    dijkstra: {
      nodes: 'Reservoir 1,Junction 2,Junction 3,Tank 4,Tank 5,Pump 6',
      edges: 'Reservoir 1 Junction 2 7\nReservoir 1 Junction 3 9\nReservoir 1 Pump 6 14\nJunction 2 Junction 3 10\nJunction 2 Tank 4 15\nJunction 3 Tank 4 11\nJunction 3 Pump 6 2\nTank 4 Tank 5 6\nTank 5 Pump 6 9',
    }
  };
  
  // Function to load example data
  const loadExample = () => {
    setNodesInput(examples[selectedAlgorithm].nodes);
    setEdgesInput(examples[selectedAlgorithm].edges);
  };
  
  // Get algorithm display name
  const getAlgorithmDisplayName = (algorithmKey) => {
    switch(algorithmKey) {
      case 'fordFulkerson':
        return 'Optimize Water Flow';
      case 'mst':
        return 'Cost-Effective Pipeline Design';
      case 'dijkstra':
        return 'Efficient Water Routing';
      default:
        return algorithmKey;
    }
  };
  
  // Handle algorithm selection
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    // Clear form when switching algorithms
    setNodesInput('');
    setEdgesInput('');
    setSourceNode('');
    setSinkNode('');
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate inputs
      if (!nodesInput.trim()) {
        throw new Error('Please enter at least one location.');
      }
      
      if (!edgesInput.trim()) {
        throw new Error('Please define at least one pipeline.');
      }
      
      if (!sourceNode) {
        throw new Error('Please select a source location.');
      }
      
      if (selectedAlgorithm !== 'mst' && !sinkNode) {
        throw new Error('Please select a destination location.');
      }
      
      // Process inputs
      const nodes = processNodes(nodesInput);
      let edges;
      let result;
      
      // Run the selected algorithm
      switch (selectedAlgorithm) {
        case 'fordFulkerson':
          edges = processEdges(edgesInput, 'flow');
          result = fordFulkerson(nodes, edges, sourceNode, sinkNode);
          setAlgorithmResults(prev => ({ ...prev, fordFulkerson: result }));
          break;
          
        case 'mst':
          edges = processEdges(edgesInput, 'mst');
          result = primMST(nodes, edges);
          setAlgorithmResults(prev => ({ ...prev, mst: result }));
          break;
          
        case 'dijkstra':
          edges = processEdges(edgesInput, 'distance');
          result = dijkstra(nodes, edges, sourceNode, sinkNode);
          setAlgorithmResults(prev => ({ ...prev, dijkstra: result }));
          break;
          
        default:
          throw new Error('Invalid algorithm selected.');
      }
      
      toast.success('Optimization completed!');
      navigate('/results');
      
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get algorithm icon
  const getAlgorithmIcon = (algorithm) => {
    switch(algorithm) {
      case 'fordFulkerson':
        return <Droplet className="h-6 w-6 text-water-dark mr-2" />;
      case 'mst':
        return <CircuitBoard className="h-6 w-6 text-water-dark mr-2" />;
      case 'dijkstra':
        return <BarChart className="h-6 w-6 text-water-dark mr-2" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Water Network Optimization</h1>
          <p className="text-gray-600 mt-2">
            Select an optimization method and input your network data to enhance your water distribution system.
          </p>
        </div>
        
        {/* Algorithm Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => handleAlgorithmChange('fordFulkerson')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg ${
                selectedAlgorithm === 'fordFulkerson'
                  ? 'bg-water text-white'
                  : 'text-gray-600 hover:text-water-dark'
              }`}
            >
              Optimize Water Flow
            </button>
            <button
              onClick={() => handleAlgorithmChange('mst')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg ${
                selectedAlgorithm === 'mst'
                  ? 'bg-water text-white'
                  : 'text-gray-600 hover:text-water-dark'
              }`}
            >
              Cost-Effective Pipeline Design
            </button>
            <button
              onClick={() => handleAlgorithmChange('dijkstra')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg ${
                selectedAlgorithm === 'dijkstra'
                  ? 'bg-water text-white'
                  : 'text-gray-600 hover:text-water-dark'
              }`}
            >
              Efficient Water Routing
            </button>
          </div>
        </div>
        
        {/* Algorithm Description */}
        <div className="mb-6 p-4 bg-water-light rounded-lg text-gray-700">
          {selectedAlgorithm === 'fordFulkerson' && (
            <div className="flex items-start">
              <Droplet className="h-6 w-6 text-water-dark mr-2 mt-1 shrink-0" />
              <div>
                <h2 className="font-semibold text-lg mb-2">Optimize Water Flow</h2>
                <p>
                  Maximizes the water flow capacity through your distribution network from source to destination.
                  Ideal for ensuring sufficient water supply to all areas during peak demand periods.
                </p>
              </div>
            </div>
          )}
          
          {selectedAlgorithm === 'mst' && (
            <div className="flex items-start">
              <CircuitBoard className="h-6 w-6 text-water-dark mr-2 mt-1 shrink-0" />
              <div>
                <h2 className="font-semibold text-lg mb-2">Cost-Effective Pipeline Design</h2>
                <p>
                  Finds the most cost-effective way to connect all locations in your water network.
                  Perfect for planning new infrastructure or optimizing existing pipeline connections.
                </p>
              </div>
            </div>
          )}
          
          {selectedAlgorithm === 'dijkstra' && (
            <div className="flex items-start">
              <BarChart className="h-6 w-6 text-water-dark mr-2 mt-1 shrink-0" />
              <div>
                <h2 className="font-semibold text-lg mb-2">Efficient Water Routing</h2>
                <p>
                  Determines the shortest path for water delivery from source to destination.
                  Excellent for minimizing distance and improving water delivery efficiency.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Input Water Network Data</h2>
            <button
              type="button"
              onClick={loadExample}
              className="text-sm text-water-dark hover:underline"
            >
              Load Example
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="nodes" className="block text-sm font-medium text-gray-700 mb-1">
                List all locations (comma-separated)
              </label>
              <input
                id="nodes"
                type="text"
                value={nodesInput}
                onChange={(e) => setNodesInput(e.target.value)}
                placeholder={
                  selectedAlgorithm === 'fordFulkerson' ? 'e.g., Reservoir A, Junction B, Tank C, Pump D' : 
                  selectedAlgorithm === 'mst' ? 'e.g., Reservoir A, Junction B, Tank C, Tank D' : 
                  'e.g., Reservoir 1, Junction 2, Tank 3, Pump 4'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="edges" className="block text-sm font-medium text-gray-700 mb-1">
                Define pipelines (one per line: source destination {
                  selectedAlgorithm === 'fordFulkerson' ? 'capacity' : 
                  selectedAlgorithm === 'mst' ? 'cost' : 'distance'
                })
              </label>
              <textarea
                id="edges"
                value={edgesInput}
                onChange={(e) => setEdgesInput(e.target.value)}
                placeholder={
                  selectedAlgorithm === 'fordFulkerson' ? 'e.g., Reservoir A Junction B 10\nJunction B Tank C 5' : 
                  selectedAlgorithm === 'mst' ? 'e.g., Reservoir A Junction B 4\nJunction B Tank C 2' : 
                  'e.g., Reservoir 1 Junction 2 7\nJunction 2 Tank 3 5'
                }
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  Source Location
                </label>
                <select
                  id="source"
                  value={sourceNode}
                  onChange={(e) => setSourceNode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
                >
                  <option value="">Select a source</option>
                  {nodeOptions.map(node => (
                    <option key={`source-${node}`} value={node}>{node}</option>
                  ))}
                </select>
              </div>
              
              {selectedAlgorithm !== 'mst' && (
                <div>
                  <label htmlFor="sink" className="block text-sm font-medium text-gray-700 mb-1">
                    Destination Location
                  </label>
                  <select
                    id="sink"
                    value={sinkNode}
                    onChange={(e) => setSinkNode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
                  >
                    <option value="">Select a destination</option>
                    {nodeOptions.map(node => (
                      <option key={`sink-${node}`} value={node}>{node}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-water hover:bg-water-dark text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-water focus:ring-opacity-50 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Computing...' : 'Run Optimization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import { fordFulkerson, primMST, dijkstra } from '../utils/graphAlgorithms';
import { toast } from 'sonner';

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
      nodes: 'A,B,C,D,E,F',
      edges: 'A B 10\nA C 8\nB C 2\nB D 4\nB E 8\nC E 9\nD F 10\nE F 10',
    },
    mst: {
      nodes: 'A,B,C,D,E',
      edges: 'A B 4\nA C 8\nB C 3\nB D 5\nC D 2\nC E 7\nD E 6',
    },
    dijkstra: {
      nodes: '1,2,3,4,5,6',
      edges: '1 2 7\n1 3 9\n1 6 14\n2 3 10\n2 4 15\n3 4 11\n3 6 2\n4 5 6\n5 6 9',
    }
  };
  
  // Function to load example data
  const loadExample = () => {
    setNodesInput(examples[selectedAlgorithm].nodes);
    setEdgesInput(examples[selectedAlgorithm].edges);
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
        throw new Error('Please enter at least one node.');
      }
      
      if (!edgesInput.trim()) {
        throw new Error('Please enter at least one edge.');
      }
      
      if (!sourceNode) {
        throw new Error('Please select a source node.');
      }
      
      if (selectedAlgorithm !== 'mst' && !sinkNode) {
        throw new Error('Please select a sink node.');
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
      
      toast.success('Algorithm calculation completed!');
      navigate('/results');
      
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Optimization Algorithms</h1>
          <p className="text-gray-600 mt-2">
            Select an algorithm and input your network data to optimize your water distribution system.
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
              Ford-Fulkerson
            </button>
            <button
              onClick={() => handleAlgorithmChange('mst')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg ${
                selectedAlgorithm === 'mst'
                  ? 'bg-water text-white'
                  : 'text-gray-600 hover:text-water-dark'
              }`}
            >
              Minimum Spanning Tree
            </button>
            <button
              onClick={() => handleAlgorithmChange('dijkstra')}
              className={`py-2 px-4 text-sm font-medium rounded-t-lg ${
                selectedAlgorithm === 'dijkstra'
                  ? 'bg-water text-white'
                  : 'text-gray-600 hover:text-water-dark'
              }`}
            >
              Dijkstra's
            </button>
          </div>
        </div>
        
        {/* Algorithm Description */}
        <div className="mb-6 p-4 bg-water-light rounded-lg text-gray-700">
          {selectedAlgorithm === 'fordFulkerson' && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Ford-Fulkerson Algorithm</h2>
              <p>
                Optimizes the maximum flow of water through your network from a source to a sink.
                Useful for determining the maximum capacity of your water distribution system.
              </p>
            </div>
          )}
          
          {selectedAlgorithm === 'mst' && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Minimum Spanning Tree</h2>
              <p>
                Finds the most cost-effective way to connect all nodes in your water network.
                Ideal for planning new infrastructure or optimizing existing connections.
              </p>
            </div>
          )}
          
          {selectedAlgorithm === 'dijkstra' && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Dijkstra's Algorithm</h2>
              <p>
                Calculates the shortest path from a source to a destination in your water network.
                Perfect for optimizing delivery routes or minimizing water transit time.
              </p>
            </div>
          )}
        </div>
        
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Input Data</h2>
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
                Nodes (comma-separated)
              </label>
              <input
                id="nodes"
                type="text"
                value={nodesInput}
                onChange={(e) => setNodesInput(e.target.value)}
                placeholder="e.g., A,B,C,D"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="edges" className="block text-sm font-medium text-gray-700 mb-1">
                Edges (one per line: source target {
                  selectedAlgorithm === 'fordFulkerson' ? 'capacity' : 
                  selectedAlgorithm === 'mst' ? 'cost' : 'distance'
                })
              </label>
              <textarea
                id="edges"
                value={edgesInput}
                onChange={(e) => setEdgesInput(e.target.value)}
                placeholder={
                  selectedAlgorithm === 'fordFulkerson' ? 'e.g., A B 10\nB C 5' : 
                  selectedAlgorithm === 'mst' ? 'e.g., A B 4\nB C 2' : 'e.g., 1 2 7\n2 3 5'
                }
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  Source Node
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
                    Sink Node
                  </label>
                  <select
                    id="sink"
                    value={sinkNode}
                    onChange={(e) => setSinkNode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-water"
                  >
                    <option value="">Select a sink</option>
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
                {isSubmitting ? 'Computing...' : 'Run Algorithm'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;


import React, { createContext, useContext, useState } from 'react';

const GraphContext = createContext();

export function useGraphContext() {
  return useContext(GraphContext);
}

export function GraphProvider({ children }) {
  // State for nodes and edges
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  // State for algorithm results
  const [algorithmResults, setAlgorithmResults] = useState({
    fordFulkerson: null,
    mst: null,
    dijkstra: null
  });
  
  // State for selected algorithm form
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('fordFulkerson');

  // Function to process nodes from comma-separated string
  const processNodes = (nodesString) => {
    const nodeArray = nodesString.split(',').map(node => node.trim()).filter(node => node !== '');
    setNodes(nodeArray);
    return nodeArray;
  };

  // Function to process edges from textarea
  const processEdges = (edgesText, format = 'flow') => {
    try {
      const edgesArray = edgesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '')
        .map(line => {
          const [source, target, value] = line.split(' ');
          
          if (!source || !target || !value) {
            throw new Error(`Invalid edge format: ${line}`);
          }

          return {
            source,
            target,
            [format === 'flow' ? 'capacity' : format === 'mst' ? 'cost' : 'distance']: parseInt(value, 10)
          };
        });
      
      setEdges(edgesArray);
      return edgesArray;
    } catch (error) {
      console.error("Error processing edges:", error);
      return [];
    }
  };

  const value = {
    nodes,
    setNodes,
    edges,
    setEdges,
    processNodes,
    processEdges,
    algorithmResults,
    setAlgorithmResults,
    selectedAlgorithm,
    setSelectedAlgorithm
  };

  return (
    <GraphContext.Provider value={value}>
      {children}
    </GraphContext.Provider>
  );
}

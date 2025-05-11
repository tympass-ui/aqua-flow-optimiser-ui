
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGraphContext } from '../contexts/GraphContext';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, LineChart, Line } from 'recharts';

const Results = () => {
  const navigate = useNavigate();
  const { algorithmResults, selectedAlgorithm, nodes, edges } = useGraphContext();
  
  // Check if results exist
  const hasResults = () => {
    return algorithmResults && algorithmResults[selectedAlgorithm];
  };
  
  // Redirect if no results
  React.useEffect(() => {
    if (!hasResults()) {
      navigate('/algorithms');
    }
  }, [hasResults, navigate]);
  
  // Calculate a simple 2D position for each node (for visualization)
  const getNodePositions = () => {
    const positions = {};
    let angle = 0;
    const radius = 100;
    const center = { x: 150, y: 150 };
    
    nodes.forEach((node, index) => {
      angle = (index * 2 * Math.PI) / nodes.length;
      positions[node] = {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        name: node
      };
    });
    
    return positions;
  };
  
  // Prepare data for visualizations
  const prepareGraphData = () => {
    if (!hasResults() || !nodes.length) return { nodes: [], links: [] };
    
    const nodePositions = getNodePositions();
    const graphNodes = Object.values(nodePositions);
    
    let graphLinks = [];
    switch (selectedAlgorithm) {
      case 'fordFulkerson':
        if (!algorithmResults.fordFulkerson?.flowEdges) break;
        
        graphLinks = algorithmResults.fordFulkerson.flowEdges.map(edge => {
          // Skip if source or target node positions don't exist
          if (!nodePositions[edge.source] || !nodePositions[edge.target]) {
            return null;
          }
          
          return {
            source: edge.source,
            target: edge.target,
            value: edge.flow,
            sourceX: nodePositions[edge.source].x,
            sourceY: nodePositions[edge.source].y,
            targetX: nodePositions[edge.target].x,
            targetY: nodePositions[edge.target].y,
          };
        }).filter(link => link !== null); // Remove any null links
        break;
        
      case 'mst':
        if (!algorithmResults.mst?.mstEdges) break;
        
        graphLinks = algorithmResults.mst.mstEdges.map(edge => {
          // Skip if source or target node positions don't exist
          if (!nodePositions[edge.source] || !nodePositions[edge.target]) {
            return null;
          }
          
          return {
            source: edge.source,
            target: edge.target,
            value: edge.cost,
            sourceX: nodePositions[edge.source].x,
            sourceY: nodePositions[edge.source].y,
            targetX: nodePositions[edge.target].x,
            targetY: nodePositions[edge.target].y,
          };
        }).filter(link => link !== null); // Remove any null links
        break;
        
      case 'dijkstra':
        // Create links for the shortest path
        const path = algorithmResults.dijkstra?.path;
        if (!path) break;
        
        graphLinks = [];
        
        for (let i = 0; i < path.length - 1; i++) {
          const source = path[i];
          const target = path[i + 1];
          
          // Skip if source or target node positions don't exist
          if (!nodePositions[source] || !nodePositions[target]) {
            continue;
          }
          
          // Find the edge between these nodes
          const edge = edges.find(e => 
            (e.source === source && e.target === target) || 
            (e.source === target && e.target === source)
          );
          
          if (edge) {
            graphLinks.push({
              source,
              target,
              value: edge.distance,
              sourceX: nodePositions[source].x,
              sourceY: nodePositions[source].y,
              targetX: nodePositions[target].x,
              targetY: nodePositions[target].y,
            });
          }
        }
        break;
    }
    
    return { nodes: graphNodes, links: graphLinks };
  };
  
  // Render the specific result based on the algorithm
  const renderAlgorithmResults = () => {
    if (!hasResults()) return null;
    
    switch (selectedAlgorithm) {
      case 'fordFulkerson':
        return renderFordFulkersonResults();
      case 'mst':
        return renderMSTResults();
      case 'dijkstra':
        return renderDijkstraResults();
      default:
        return <div>No results to display.</div>;
    }
  };
  
  // Render Ford-Fulkerson results
  const renderFordFulkersonResults = () => {
    if (!algorithmResults.fordFulkerson) return null;
    
    const { maxFlow, flowEdges } = algorithmResults.fordFulkerson;
    
    // Prepare data for flow chart
    const flowChartData = flowEdges
      .filter(edge => edge.flow > 0)
      .map(edge => ({
        name: `${edge.source}-${edge.target}`,
        flow: edge.flow,
        capacity: edge.capacity
      }))
      .sort((a, b) => b.flow - a.flow);
    
    return (
      <>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Maximum Flow Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Maximum Flow</h3>
                <span className="text-4xl font-bold text-water-dark">{maxFlow}</span>
                <p className="mt-2 text-gray-600 text-sm">
                  Maximum amount of water that can flow through the network
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Flow Distribution</h3>
                <p className="text-gray-600">
                  {flowEdges.filter(edge => edge.flow > 0).length} active edges out of {flowEdges.length} total edges
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  Efficiency: {Math.round((maxFlow / flowEdges.reduce((acc, edge) => acc + edge.capacity, 0)) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {flowChartData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Flow Distribution by Edge</h2>
            <div style={{ width: '100%', height: 300 }}>
              <BarChart
                width={Math.max(500, flowChartData.length * 60)}
                height={300}
                data={flowChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="flow" fill="#0EA5E9" name="Flow" />
                <Bar dataKey="capacity" fill="#94a3b8" name="Capacity" />
              </BarChart>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Edge Flow Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Edge</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Flow</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Capacity</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Utilization</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {flowEdges.map((edge, index) => (
                  <tr key={`flow-${index}`} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.source} → {edge.target}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.flow}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.capacity}</td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {Math.round((edge.flow / edge.capacity) * 100)}%
                      <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-water rounded-full" 
                          style={{ width: `${(edge.flow / edge.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  // Render MST results
  const renderMSTResults = () => {
    if (!algorithmResults.mst) return null;
    
    const { totalCost, mstEdges } = algorithmResults.mst;
    
    return (
      <>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Minimum Spanning Tree Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Total Cost</h3>
                <span className="text-4xl font-bold text-water-dark">{totalCost}</span>
                <p className="mt-2 text-gray-600 text-sm">
                  Minimum cost to connect all nodes in the network
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Edges in MST</h3>
                <span className="text-4xl font-bold text-water-dark">{mstEdges.length}</span>
                <p className="mt-2 text-gray-600 text-sm">
                  Out of {edges.length} total edges available
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">MST Edges</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">From</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">To</th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Cost</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {mstEdges.map((edge, index) => (
                  <tr key={`mst-${index}`} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.source}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.target}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{edge.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };
  
  // Render Dijkstra results
  const renderDijkstraResults = () => {
    if (!algorithmResults.dijkstra) return null;
    
    const { distance, path, pathExists } = algorithmResults.dijkstra;
    
    // Prepare path data for visualization
    const pathData = [];
    for (let i = 0; i < path.length - 1; i++) {
      const edge = edges.find(e => 
        (e.source === path[i] && e.target === path[i + 1]) || 
        (e.source === path[i + 1] && e.target === path[i])
      );
      
      if (edge) {
        pathData.push({
          name: `${path[i]}-${path[i + 1]}`,
          distance: edge.distance
        });
      }
    }
    
    return (
      <>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shortest Path Results</h2>
          
          {pathExists ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Shortest Distance</h3>
                  <span className="text-4xl font-bold text-water-dark">{distance}</span>
                  <p className="mt-2 text-gray-600 text-sm">
                    Minimum distance between source and destination
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Path Length</h3>
                  <span className="text-4xl font-bold text-water-dark">{path.length} nodes</span>
                  <p className="mt-2 text-gray-600 text-sm">
                    {path.length - 1} hops along the shortest path
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-700">No path exists between the selected source and destination nodes.</p>
            </div>
          )}
        </div>
        
        {pathExists && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shortest Path</h2>
              <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-wrap">
                  {path.map((node, index) => (
                    <React.Fragment key={`path-${index}`}>
                      <span className="bg-water text-white py-1 px-3 rounded-full">
                        {node}
                      </span>
                      {index < path.length - 1 && (
                        <svg className="h-6 w-6 mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
            {pathData.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Path Segments</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Segment</th>
                        <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase">Distance</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {pathData.map((segment, index) => (
                        <tr key={`segment-${index}`} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-2 px-4 border-b border-gray-200">{segment.name}</td>
                          <td className="py-2 px-4 border-b border-gray-200">{segment.distance}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-200 font-medium">Total</td>
                        <td className="py-2 px-4 border-b border-gray-200 font-medium">{distance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
  };
  
  // Render the network visualization
  const renderNetworkVisualization = () => {
    const graphData = prepareGraphData();
    
    // Return placeholder if there's no data to show
    if (!graphData.nodes.length) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Network Visualization</h2>
          <div className="p-8 text-center text-gray-500">
            No network data available to visualize.
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Network Visualization</h2>
        
        <div className="w-full overflow-x-auto" style={{ height: 350 }}>
          <ScatterChart
            width={350}
            height={350}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" domain={[0, 300]} hide />
            <YAxis type="number" dataKey="y" domain={[0, 300]} hide />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            
            {/* Draw edges */}
            {graphData.links.map((link, index) => (
              <line
                key={`link-${index}`}
                x1={link.sourceX}
                y1={link.sourceY}
                x2={link.targetX}
                y2={link.targetY}
                stroke={selectedAlgorithm === 'dijkstra' ? '#0EA5E9' : '#94a3b8'}
                strokeWidth={selectedAlgorithm === 'dijkstra' ? 3 : 1}
              />
            ))}
            
            {/* Draw nodes */}
            <Scatter
              name="Nodes"
              data={graphData.nodes}
              fill="#0EA5E9"
              shape="circle"
            />
            
            {/* Add node labels */}
            {graphData.nodes.map((node, index) => (
              <text
                key={`node-label-${index}`}
                x={node.x}
                y={node.y}
                dy={-10}
                textAnchor="middle"
                fill="#333"
                fontSize={12}
              >
                {node.name}
              </text>
            ))}
          </ScatterChart>
        </div>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>Simplified network visualization (node placement is algorithmic, not geographical)</p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedAlgorithm === 'fordFulkerson' && 'Maximum Flow Results'}
            {selectedAlgorithm === 'mst' && 'Minimum Spanning Tree Results'}
            {selectedAlgorithm === 'dijkstra' && 'Shortest Path Results'}
          </h1>
          <button
            onClick={() => navigate('/algorithms')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors"
          >
            Back to Algorithms
          </button>
        </div>
        
        {hasResults() ? (
          <>
            {renderNetworkVisualization()}
            {renderAlgorithmResults()}
          </>
        ) : (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
            <p className="text-yellow-700">
              No results to display. Please run an algorithm first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;

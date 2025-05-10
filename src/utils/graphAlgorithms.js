
// Ford-Fulkerson algorithm for maximum flow
export function fordFulkerson(nodes, edges, source, sink) {
  // Create a residual graph
  const residualGraph = createResidualGraph(edges);
  let maxFlow = 0;
  
  // Find augmenting paths and update residual graph
  let path = findAugmentingPath(residualGraph, source, sink);
  
  while (path) {
    // Find minimum residual capacity along the path
    let minCapacity = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      minCapacity = Math.min(minCapacity, getResidualCapacity(residualGraph, u, v));
    }
    
    // Update residual capacities
    for (let i = 0; i < path.length - 1; i++) {
      const u = path[i];
      const v = path[i + 1];
      updateResidualCapacity(residualGraph, u, v, -minCapacity);
      updateResidualCapacity(residualGraph, v, u, minCapacity);
    }
    
    maxFlow += minCapacity;
    path = findAugmentingPath(residualGraph, source, sink);
  }
  
  // Calculate flow for each edge
  const flowEdges = edges.map(edge => {
    const reverseEdge = `${edge.target}-${edge.source}`;
    const flow = residualGraph[reverseEdge] || 0;
    return {
      ...edge,
      flow
    };
  });
  
  return { maxFlow, flowEdges };
}

// Helper functions for Ford-Fulkerson
function createResidualGraph(edges) {
  const graph = {};
  
  edges.forEach(edge => {
    const key = `${edge.source}-${edge.target}`;
    graph[key] = edge.capacity;
  });
  
  return graph;
}

function getResidualCapacity(graph, u, v) {
  const key = `${u}-${v}`;
  return graph[key] || 0;
}

function updateResidualCapacity(graph, u, v, value) {
  const key = `${u}-${v}`;
  graph[key] = (graph[key] || 0) + value;
}

function findAugmentingPath(graph, source, sink) {
  const visited = new Set();
  const path = [];
  
  if (dfs(source)) {
    return path;
  }
  
  return null;
  
  function dfs(vertex) {
    visited.add(vertex);
    path.push(vertex);
    
    if (vertex === sink) {
      return true;
    }
    
    for (const key in graph) {
      if (key.startsWith(`${vertex}-`) && graph[key] > 0) {
        const neighbor = key.split('-')[1];
        
        if (!visited.has(neighbor) && dfs(neighbor)) {
          return true;
        }
      }
    }
    
    path.pop();
    return false;
  }
}

// Prim's Algorithm for Minimum Spanning Tree
export function primMST(nodes, edges) {
  if (nodes.length === 0) return { totalCost: 0, mstEdges: [] };
  
  const graph = createGraph(nodes, edges);
  const visited = new Set();
  const mstEdges = [];
  let totalCost = 0;
  
  // Start with the first node
  visited.add(nodes[0]);
  
  while (visited.size < nodes.length) {
    let minEdge = null;
    let minCost = Infinity;
    
    // Find the cheapest edge connecting a visited node to an unvisited one
    for (const edge of edges) {
      const { source, target, cost } = edge;
      
      if (
        (visited.has(source) && !visited.has(target)) ||
        (visited.has(target) && !visited.has(source))
      ) {
        if (cost < minCost) {
          minCost = cost;
          minEdge = edge;
        }
      }
    }
    
    if (!minEdge) break;
    
    visited.add(visited.has(minEdge.source) ? minEdge.target : minEdge.source);
    mstEdges.push(minEdge);
    totalCost += minEdge.cost;
  }
  
  return { totalCost, mstEdges };
}

// Dijkstra's Algorithm for Shortest Path
export function dijkstra(nodes, edges, source, target) {
  // Create adjacency list
  const graph = createGraph(nodes, edges);
  
  const distances = {};
  const previous = {};
  const unvisited = new Set(nodes);
  
  // Initialize distances
  for (const node of nodes) {
    distances[node] = Infinity;
  }
  distances[source] = 0;
  
  while (unvisited.size > 0) {
    // Find node with minimum distance
    let minNode = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        minNode = node;
      }
    }
    
    if (minDistance === Infinity) break;
    if (minNode === target) break;
    
    unvisited.delete(minNode);
    
    // Update distances to neighbors
    for (const neighbor in graph[minNode]) {
      const distance = distances[minNode] + graph[minNode][neighbor];
      
      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = minNode;
      }
    }
  }
  
  // Reconstruct path
  const path = [];
  let current = target;
  
  if (previous[current] || current === source) {
    while (current) {
      path.push(current);
      current = previous[current];
    }
    path.reverse();
  }
  
  return {
    distance: distances[target],
    path,
    pathExists: path.length > 0
  };
}

// Helper function to create a graph from edges
function createGraph(nodes, edges) {
  const graph = {};
  
  // Initialize empty adjacency lists
  for (const node of nodes) {
    graph[node] = {};
  }
  
  // Add edges to the graph
  for (const edge of edges) {
    const { source, target, cost, distance, capacity } = edge;
    const weight = cost || distance || capacity;
    
    graph[source][target] = weight;
    graph[target][source] = weight; // For undirected graphs
  }
  
  return graph;
}

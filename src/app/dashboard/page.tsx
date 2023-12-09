"use client";

import { Edge, Node, Position, ReactFlowProvider } from "reactflow";

import { Flow } from "@/components/Flow";

const nodeSize = {
  width: 100,
  height: 40,
};

// this example uses some v12 features that are not released yet
const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
    size: nodeSize,
    handles: [
      {
        type: "source",
        position: "bottom" as Position,
        x: nodeSize.width * 0.5,
        y: nodeSize.height,
        width: 1,
        height: 1,
      },
    ],
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 100, y: 100 },
    size: nodeSize,
    handles: [
      {
        type: "source",
        position: "bottom" as Position,
        x: nodeSize.width * 0.5,
        y: nodeSize.height,
        width: 1,
        height: 1,
      },
      {
        type: "target",
        position: "top" as Position,
        x: nodeSize.width * 0.5,
        y: 0,
        width: 1,
        height: 1,
      },
    ],
  },
  {
    id: "3",
    data: { label: "Node 3" },
    position: { x: 400, y: 100 },
    size: nodeSize,
    handles: [
      {
        type: "source",
        position: "bottom" as Position,
        x: nodeSize.width * 0.5,
        y: nodeSize.height,
        width: 1,
        height: 1,
      },
      {
        type: "target",
        position: "top" as Position,
        x: nodeSize.width * 0.5,
        y: 0,
        width: 1,
        height: 1,
      },
    ],
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

function fetchData() {
  return { nodes: initialNodes, edges: initialEdges };
}

export default function App() {
  const { nodes, edges } = fetchData();

  return (
    <main>
      <ReactFlowProvider>
        <Flow nodes={nodes} edges={edges} />
      </ReactFlowProvider>
    </main>
  );
}

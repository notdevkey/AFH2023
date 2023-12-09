import { Edge, Node, Position } from "reactflow";
import { create } from "zustand";

interface NodeState {
  nodes: Node[];
  edges: Edge[];
  setNodes: (nodes: Node[]) => void;
  setEdges: (nodes: Edge[]) => void;
}

export const nodeSize = {
  width: 100,
  height: 40,
};

export const useNodes = create<NodeState>()((set) => ({
  nodes: [
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
  ],
  edges: [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      style: { stroke: "#0083ff" },
      animated: true,
    },
    { id: "e1-3", source: "1", target: "3", animated: true },
  ],
  setNodes: (nodes: Node[]) =>
    set(() => ({
      nodes,
    })),
  setEdges: (edges: Edge[]) =>
    set(() => ({
      edges,
    })),
}));

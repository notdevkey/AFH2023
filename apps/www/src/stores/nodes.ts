import { Edge, Node } from "reactflow";
import { create } from "zustand";

export const nodeSize = {
  width: 100,
  height: 40,
};

export const initialNodes: CustomNodeType[] = [
  {
    id: "1",
    position: { x: 250, y: 5 },
    type: "relay",
    data: {
      flowThrough: true,
      nodeType: "action",
    },
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { nodeType: "action", flowThrough: true },
  },
];

export const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    style: { stroke: "#0083ff" },
    animated: true,
  },
  { id: "e1-3", source: "1", target: "3", animated: true },
];
export type NodeFunction =
  | "date"
  | "nordpool"
  | "relay"
  | "temperature"
  | "input"
  | "output";
export type NodeType = "trigger" | "action" | "io";
interface Data {
  nodeType: NodeType;
  flowThrough: boolean;
}
type CustomNodeType<T = Data, U extends NodeFunction = NodeFunction> = Node<
  T,
  U
>;

interface NodeState {
  nodes: Node[];
  edges: Edge[];
  setNodes(nodes: Node[]): void;
  setEdges: (edges: Edge[]) => void;
}

export const useNodes = create<NodeState>()((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,

  setNodes(nodes) {
    set({
      nodes,
    });
  },

  setEdges(edges) {
    set({
      edges,
    });
  },
}));

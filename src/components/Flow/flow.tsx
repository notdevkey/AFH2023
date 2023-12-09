"use client";

import { useNodes } from "@/stores/nodes";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import { DateNode } from "..";

export function Flow() {
  const [nodes, edges, setNodes, setEdges] = useNodes((state) => [
    state.nodes,
    state.edges,
    state.setNodes,
    state.setEdges,
  ]);

  const nodeTypes = useMemo(() => ({ date: DateNode }), []);

  const onNodesChange: OnNodesChange = useCallback(
    (chs) => {
      setNodes(applyNodeChanges(chs, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (chs) => {
      setEdges(applyEdgeChanges(chs, edges));
    },
    [edges, setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges(addEdge(params, edges)),
    [edges, setEdges]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

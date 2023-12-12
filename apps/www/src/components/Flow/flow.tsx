"use client";

import { useNodes } from "@/stores/nodes";
import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import {
  DateNode,
  InputNode,
  NordpoolNode,
  OutputNode,
  RelayNode,
  TemperatureNode,
} from "..";

export function Flow() {
  const [nodes, edges, setNodes, setEdges] = useNodes((state) => [
    state.nodes,
    state.edges,
    state.setNodes,
    state.setEdges,
  ]);

  const getElectricityEdge = useCallback(
    (params: Connection) => ({
      ...params,
      animated: true,
      style: { stroke: "#0083ff" },
    }),
    []
  );

  const nodeTypes = useMemo(
    () => ({
      date: DateNode,
      nordpool: NordpoolNode,
      temperature: TemperatureNode,
      relay: RelayNode,
      input: InputNode,
      output: OutputNode,
    }),
    []
  );

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
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      console.log(sourceNode, "SOURCE NODE");
      setEdges(
        addEdge(
          sourceNode?.data.nodeType === "io" || sourceNode?.data.flowThrough
            ? getElectricityEdge(params)
            : params,
          edges
        )
      );
    },
    [edges, getElectricityEdge, nodes, setEdges]
  );

  return (
    <div className="relative w-full h-full">
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

import React, { useCallback, useState, useMemo, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import PlusNode from "./PlusNode";
import EmailUpdateNode from "./EmailUpdateNode";
import OptionNode from "./OptionNode";
import EmailNode from "./EmailNode";
import ApiUpdateNode from "./ApiUpdateNode";
import ApiNode from "./ApiNode";

const initialNodes = [
  {
    id: "start-node",
    position: { x: window.innerWidth / 2 - 150, y: 100 },
    data: { label: "Start" },
    type: "input",
  },
  {
    id: "end-node",
    position: { x: window.innerWidth / 2 - 150, y: 400 },
    data: { label: "End" },
    type: "output",
  },
];

const initialEdges = [
  {
    id: "e-start-end",
    source: "start-node",
    target: "end-node",
    type: "plus",
  },
];

function WorkflowCanvas({
  initialWorkflowNodes,
  initialWorkflowEdges,
  onWorkflowChange,
}) {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialWorkflowNodes || initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(
    initialWorkflowEdges || initialEdges
  );

  useEffect(() => {
    onWorkflowChange({ nodes, edges });
  }, [nodes, edges, onWorkflowChange]);

  useEffect(() => {
    const hasStartNode = nodes.some((node) => node.id === "start-node");
    const hasEndNode = nodes.some((node) => node.id === "end-node");
    const hasOtherEdges = edges.some(
      (edge) =>
        edge.id !== "e-start-end" &&
        edge.source !== "start-node" &&
        edge.target !== "end-node"
    );

    if (hasStartNode && hasEndNode && !hasOtherEdges) {
      setEdges(() => initialEdges);
    }
  }, [nodes, edges, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: "plus" }, eds)),
    [setEdges]
  );

  const nodeTypes = useMemo(
    () => ({
      emailUpdater: EmailUpdateNode,
      option: OptionNode,
      email: EmailNode,
      apiUpdater: ApiUpdateNode,
      api: ApiNode,
    }),
    []
  );

  const edgeTypes = useMemo(() => ({ plus: PlusNode }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      connectionMode="strict"
      fitView
    >
      <Controls />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}

export default WorkflowCanvas;

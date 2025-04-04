import React from "react";
import {
  Handle,
  Position,
  useReactFlow,
  getConnectedEdges,
} from "@xyflow/react";

function ApiNode({ id, data }) {
  const { getNode, getEdges, setNodes, setEdges, deleteElements } =
    useReactFlow();

  const handleDelete = () => {
    const nodeToDelete = getNode(id);
    if (!nodeToDelete) return;

    const connectedEdges = getConnectedEdges([nodeToDelete], getEdges());

    let sourceNodeId = null;
    let targetNodeId = null;

    connectedEdges.forEach((edge) => {
      if (edge.target === id) {
        sourceNodeId = edge.source;
      }
      if (edge.source === id) {
        targetNodeId = edge.target;
      }
    });

    const elementsToDelete = { nodes: [nodeToDelete], edges: connectedEdges };
    deleteElements(elementsToDelete);

    if (sourceNodeId && targetNodeId) {
      const newEdge = {
        id: `e-${sourceNodeId}-${targetNodeId}-${Date.now()}`,
        source: sourceNodeId,
        target: targetNodeId,
        type: "plus",
      };
      setEdges((eds) => [...eds, newEdge]);
    }
  };

  return (
    <div className="w-auto px-4 py-2 bg-white border-2 border-blue-400 rounded shadow-md react-flow__node-default node-api">
      <Handle
        type="target"
        position={Position.Top}
        id="target"
        isConnectable={true}
      />

      <div className="flex items-center justify-between">
        <span className="mr-2 text-sm">{data.label || "API Call"}</span>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center w-4 h-4 px-1 py-1 text-xs font-bold text-white bg-red-500 rounded-full nodrag hover:bg-red-700"
          title="Delete Node"
          style={{ lineHeight: "1" }}
        >
          ×
        </button>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        id="source"
        isConnectable={true}
      />
    </div>
  );
}

export default ApiNode;

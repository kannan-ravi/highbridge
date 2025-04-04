import { useCallback, useState } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

function EmailUpdateNode({ id, data }) {
  const onChange = useCallback((e) => {
    setEmailDetails(e.target.value);
  }, []);

  const { getNode, setNodes, setEdges, deleteElements } = useReactFlow();
  const { previousSourceId, nextTargetId, originalEdgeId } = data;
  const [emailDetails, setEmailDetails] = useState("");

  const handleSaveEmail = () => {
    const currentNode = getNode(id);
    if (!currentNode) return;

    const newEmailNodeId = `email-node-${Date.now()}`;

    const newEmailNode = {
      id: newEmailNodeId,
      position: { x: currentNode.position.x - 95, y: currentNode.position.y + 15 },
      data: { label: "Email" },
      type: "email",
    };
    const edge1 = {
      id: `e-${previousSourceId}-${newEmailNodeId}`,
      source: previousSourceId,
      target: newEmailNodeId,
      type: "plus",
    };
    const edge2 = {
      id: `e-${newEmailNodeId}-${nextTargetId}`,
      source: newEmailNodeId,
      target: nextTargetId,
      type: "plus",
    };

    setNodes((nds) =>
      nds.filter((node) => node.id !== id).concat(newEmailNode)
    );
    setEdges((eds) =>
      eds.filter((edge) => edge.id !== originalEdgeId).concat([edge1, edge2])
    );
  };

  const handleCancel = () => {
    handleDeleteLikeEmailNode();
  };

  const handleDeleteLikeEmailNode = () => {
    deleteElements({ nodes: [{ id }] });
    setEdges((eds) =>
      eds
        .filter((e) => e.id !== originalEdgeId)
        .concat([
          {
            id: `e-${previousSourceId}-${nextTargetId}-${Date.now()}`,
            source: previousSourceId,
            target: nextTargetId,
            type: "plus",
          },
        ])
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={false} />

      <div className="flex flex-col gap-2 p-3 bg-white border rounded shadow-md">
        <label
          htmlFor={`email-text-${id}`}
          className="text-[12px] font-medium text-slate-500"
        >
          Email:
        </label>
        <input
          id={`email-text-${id}`}
          name="text"
          onChange={onChange}
          className="px-3 py-1 rounded outline-none nodrag text-[12px] border focus:ring-1 focus:ring-slate-50"
          value={emailDetails}
          placeholder="Enter email"
          type="text"
        />
        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={handleCancel}
            className="px-4 py-1 text-slate-500 bg-white border text-[10px] rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveEmail}
            className="px-4 py-1 text-slate-800 bg-white hover:bg-gray-50 border text-[10px] rounded"
            disabled={!emailDetails.trim()}
          >
            Save
          </button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </>
  );
}

export default EmailUpdateNode;

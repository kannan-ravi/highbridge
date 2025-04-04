import { Handle, Position, useReactFlow } from "@xyflow/react";
import React from "react";

const OptionNode = (props) => {
  const { id, data } = props;
  const { addNodes, setNodes } = useReactFlow();
  const { midX, midY, sourceId, targetId, edgeId } = data;
  const openApiEmailNode = () => {
    const newEmailNodeId = `email-updater-${Date.now()}`;

    addNodes({
      id: newEmailNodeId,
      position: { x: midX + 20, y: midY - 40 },
      data: {
        label: "Email Updater",
        previousSourceId: sourceId,
        nextTargetId: targetId,
        originalEdgeId: edgeId,
      },
      type: "emailUpdater",
    });

    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  const openApiCallNode = () => {
    const newApiUpdaterNodeId = `api-updater-${Date.now()}`;
    addNodes({
      id: newApiUpdaterNodeId,
      position: { x: midX + 20, y: midY - 150 },
      data: {
        label: "API Updater",
        previousSourceId: sourceId,
        nextTargetId: targetId,
        originalEdgeId: edgeId,
      },
      type: "apiUpdater",
    });

    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  return (
    <>
      {/* <Handle type="source" position={Position.Left} id="a" /> */}
      <div className="flex gap-2 bg-white rounded-sm">
        <button
          className="text-[10px] border hover:bg-gray-50 px-3 py-1"
          onClick={openApiCallNode}
        >
          API Call
        </button>
        <button
          className="px-3 py-1 text-[10px] border hover:bg-gray-50"
          onClick={openApiEmailNode}
        >
          Email
        </button>
      </div>
    </>
  );
};

export default OptionNode;

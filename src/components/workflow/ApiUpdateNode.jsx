import React, { useState, useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";

const ApiUpdateNode = ({ id, data }) => {
  const { getNode, setNodes, setEdges, deleteElements } = useReactFlow();
  const { previousSourceId, nextTargetId, originalEdgeId } = data;

  const [apiConfig, setApiConfig] = useState({
    method: "GET",
    url: "",
    headers: "",
    body: "",
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setApiConfig((prevConfig) => ({
      ...prevConfig,
      [name]: value,
    }));
  }, []);

  const hasBody = ["POST", "PUT", "PATCH"].includes(apiConfig.method);

  const handleSaveApi = () => {
    const currentNode = getNode(id);
    if (!currentNode) return;

    const newApiNodeId = `api-node-${Date.now()}`;
    const label = `${apiConfig.method}: ${apiConfig.url.substring(0, 25)}${
      apiConfig.url.length > 25 ? "..." : ""
    }`;

    const newApiNode = {
      id: newApiNodeId,
      position: { x: currentNode.position.x - 95, y: currentNode.position.y + 120 },
      data: {
        label: "API Call",
        config: apiConfig,
      },
      type: "api",
    };

    const edge1 = {
      id: `e-${previousSourceId}-${newApiNodeId}`,
      source: previousSourceId,
      target: newApiNodeId,
      type: "plus",
    };
    const edge2 = {
      id: `e-${newApiNodeId}-${nextTargetId}`,
      source: newApiNodeId,
      target: nextTargetId,
      type: "plus",
    };

    setNodes((nds) => nds.filter((node) => node.id !== id).concat(newApiNode));

    setEdges((eds) =>
      eds.filter((edge) => edge.id !== originalEdgeId).concat([edge1, edge2])
    );
  };

  const handleCancel = () => {
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
      <div className="flex flex-col gap-2 p-3 bg-white border rounded shadow-md w-60">
        <label className="text-[12px] font-medium text-slate-500">
          API Call Configuration:
        </label>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`api-method-${id}`}
            className="text-[10px] text-slate-600"
          >
            Method
          </label>
          <select
            id={`api-method-${id}`}
            name="method"
            value={apiConfig.method}
            onChange={onChange}
            className="px-2 py-1 rounded outline-none nodrag text-[12px] border focus:ring-1 focus:ring-slate-50 text-slate-800"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`api-url-${id}`}
            className="text-[10px] text-slate-600"
          >
            URL
          </label>
          <input
            id={`api-url-${id}`}
            name="url"
            value={apiConfig.url}
            onChange={onChange}
            placeholder="https://api.example.com/data"
            className="px-2 py-1 rounded outline-none nodrag text-[12px] border focus:ring-1 focus:ring-slate-50 text-slate-800"
            type="text"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`api-headers-${id}`}
            className="text-[10px] text-slate-600"
          >
            Headers (JSON)
          </label>
          <textarea
            id={`api-headers-${id}`}
            name="headers"
            value={apiConfig.headers}
            onChange={onChange}
            rows={3}
            placeholder={`{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer YOUR_TOKEN"\n}`}
            className="px-2 py-1 rounded outline-none nodrag text-[11px] border focus:ring-1 focus:ring-slate-50 font-mono text-slate-800"
          />
        </div>

        {hasBody && (
          <div className="flex flex-col gap-1">
            <label
              htmlFor={`api-body-${id}`}
              className="text-[10px] text-slate-600"
            >
              Body (JSON)
            </label>
            <textarea
              id={`api-body-${id}`}
              name="body"
              value={apiConfig.body}
              onChange={onChange}
              rows={4}
              placeholder={`{\n  "key": "value"\n}`}
              className="px-2 py-1 rounded outline-none nodrag text-[11px] border focus:ring-1 focus:ring-slate-50 font-mono text-slate-800"
            />
          </div>
        )}

        <div className="flex justify-end gap-2 mt-1">
          <button
            onClick={handleCancel}
            className="px-4 py-1 text-slate-500 bg-white border text-[10px] rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveApi}
            className="px-4 py-1 text-slate-800 bg-white hover:bg-gray-50 border text-[10px] rounded"
            disabled={!apiConfig.url.trim()}
          >
            Save
          </button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </>
  );
};

export default ApiUpdateNode;

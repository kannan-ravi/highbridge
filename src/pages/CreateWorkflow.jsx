import React, { useCallback, useState, useMemo } from "react";
import "@xyflow/react/dist/style.css";
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import PlusNode from "../components/workflow/PlusNode";
import EmailUpdateNode from "../components/workflow/EmailUpdateNode";
import OptionNode from "../components/workflow/OptionNode";
import EmailNode from "../components/workflow/EmailNode";
import ApiUpdateNode from "../components/workflow/ApiUpdateNode";
import ApiNode from "../components/workflow/ApiNode";
import { Link, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import PopupForm from "../components/PopupForm";
import { useSelector } from "react-redux";
import { firestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateWorkflow() {
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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    const filteredWorkflowNodes = nodes.filter(
      (node) => node.type === "email" || node.type === "api"
    );

    const data = {
      user_id: user.uuid,
      name: formData.name,
      description: formData.description,
      workflow: filteredWorkflowNodes,
      last_updated: new Date(),
    };

    try {
      const workflowsCollection = collection(firestore, "workflows");
      const docRef = await addDoc(workflowsCollection, data);
      navigate("/");
    } catch (error) {
      console.error("Error saving workflow data: ", error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  return (
    <>
      <ReactFlowProvider>
        <div className="w-screen h-screen">
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
        </div>
      </ReactFlowProvider>
      <div className="absolute z-20 flex items-center gap-6 px-4 py-2 bg-white border top-10 left-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-base font-semibold underline"
        >
          <FaArrowLeftLong />
          Go Back
        </Link>

        <p className="text-base font-semibold">Untitiled</p>
        <FaSave
          className="text-2xl transition duration-200 hover:text-yellow-400"
          onClick={() => setIsPopupOpen(true)}
        />
      </div>
      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

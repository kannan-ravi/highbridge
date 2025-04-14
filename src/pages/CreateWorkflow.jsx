import React, { useCallback, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Link, useNavigate } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import PopupForm from "../components/PopupForm";
import { useSelector } from "react-redux";
import { firestore } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import WorkflowCanvas from "../components/workflow/WorkflowCanvas";

export default function CreateWorkflow() {
  const [workflowData, setWorkflowData] = useState({ nodes: [], edges: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleWorkflowChange = useCallback((data) => {
    setWorkflowData(data);
  }, []);

  const handleSubmit = async (formData) => {
    const data = {
      user_id: user.uuid,
      name: formData.name,
      description: formData.description,
      workflow: workflowData,
      last_updated: new Date(),
    };

    try {
      const workflowsCollection = collection(firestore, "workflows");
      await addDoc(workflowsCollection, data);
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
          <WorkflowCanvas onWorkflowChange={handleWorkflowChange} />
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

        <p className="text-base font-semibold">Untitled</p>
        <FaSave
          className="text-2xl transition duration-200 hover:text-yellow-400"
          onClick={() => setIsPopupOpen(true)}
        />
      </div>
      <PopupForm
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleSubmit}
        initialValues={{ name: "", description: "" }}
      />
    </>
  );
}

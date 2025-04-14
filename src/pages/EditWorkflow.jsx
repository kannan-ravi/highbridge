import React, { useCallback, useEffect, useState } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import { Link, useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import PopupForm from "../components/PopupForm";
import { useSelector } from "react-redux";
import { firestore } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  where,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import WorkflowCanvas from "../components/workflow/WorkflowCanvas";

export default function EditWorkflow() {
  const { id } = useParams();

  const [workflowData, setWorkflowData] = useState({ nodes: [], edges: [] });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [workflowName, setWorkflowName] = useState("Untitled");
  const [workflowDescription, setWorkflowDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
      const workflowRef = doc(firestore, "workflows", id);
      await setDoc(workflowRef, { ...data, id }, { merge: true });
      navigate("/");
    } catch (error) {
      console.error("Error saving workflow data: ", error);
    } finally {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        const docRef = doc(firestore, "workflows", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setWorkflowData(data.workflow);
          setWorkflowName(data.name || "Untitled");
          setWorkflowDescription(data.description || "");
        } else {
          console.log("No such document!");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching workflow: ", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflow();
  }, [id, navigate]);

  return (
    <>
      <ReactFlowProvider>
        <div className="w-screen h-screen">
          {workflowData.nodes.length > 0 && workflowData.edges.length > 0 ? (
            <WorkflowCanvas
              initialWorkflowNodes={workflowData.nodes}
              initialWorkflowEdges={workflowData.edges}
              onWorkflowChange={handleWorkflowChange}
            />
          ) : isLoading ? (
            <div className="flex items-center justify-center w-full h-full">
              Loading...
            </div>
          ) : null}
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

        <p className="text-base font-semibold">{workflowName}</p>
        <FaSave
          className="text-2xl transition duration-200 hover:text-yellow-400"
          onClick={() => setIsPopupOpen(true)}
        />
      </div>

      {workflowData.nodes.length > 0 && workflowData.edges.length > 0 && (
        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSubmit={handleSubmit}
          initialValues={{
            name: workflowName,
            description: workflowDescription,
          }}
        />
      )}
    </>
  );
}

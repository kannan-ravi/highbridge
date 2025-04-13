import { Link, Navigate, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import TableCell from "../components/table/TableCell";
import Popup from "../components/table/Popup";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authSlice";

const Home = () => {
  const [workflows, setWorkflows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchWorkflows = async () => {
      setLoading(true);
      setError(null);
      try {
        const workflowsCollection = collection(firestore, "workflows");
        const workflowQuery = query(workflowsCollection, where('user_id', '==', user.uuid));
        const querySnapshot = await getDocs(workflowQuery);
        const workflowData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setWorkflows(workflowData);
      } catch (e) {
        console.error("Error fetching workflows:", e);
        setError("Failed to load workflows.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const handleDeleteWorkflow = async () => {
    if (!selectedWorkflow) return;

    try {
      const workflowRef = doc(firestore, "workflows", selectedWorkflow.id);
      await deleteDoc(workflowRef);

      setWorkflows(
        workflows.filter((workflow) => workflow.id !== selectedWorkflow.id)
      );
      setDeletePopup(false);
      setSelectedWorkflow(null);
    } catch (error) {
      console.error("Error deleting workflow:", error);
      setError("Failed to delete workflow.");
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLogout = () => {
    try {
      signOut(auth);
      navigate("/login");
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      <div className="container py-10 mx-auto">
        <div className="flex items-center justify-between gap-3 px-4">
          <h1 className="text-2xl font-bold">Workflow Builder</h1>
          <MdLogout
            className="text-2xl cursor-pointer"
            onClick={handleLogout}
          />
        </div>

        <div className="flex flex-col gap-4 px-4 py-10 sm:flex-row sm:justify-between">
          <div className="w-full sm:w-fit">
            <div className="relative max-w-80">
              <input
                type="text"
                placeholder="Search By Workflow Name/ID"
                className="px-3 py-1.5 rounded border border-gray-300 w-full outline-none placeholder:text-sm sm:min-w-72"
              />
              <FaSearch className="absolute top-0 right-0 mt-3 mr-3 text-gray-400" />
            </div>
          </div>
          <Link
            to="/create-workflow"
            className="px-4 py-2 text-sm text-white bg-gray-900 rounded hover:bg-gray-800 w-fit"
          >
            + Create New Process
          </Link>
        </div>

        <div className="px-8 py-4 overflow-x-auto bg-white">
          <table className="w-full">
            <thead className="border-b border-red-600">
              <tr>
                <th className="py-3 font-medium text-nowrap">Workflow Name</th>
                <th className="py-3 font-medium">ID</th>
                <th className="py-3 font-medium text-nowrap">Last Edited On</th>
                <th className="py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {!loading && workflows.length > 0 ? (
                workflows.map((workflow) => (
                  <TableCell
                    key={workflow?.id}
                    workflow={workflow}
                    setPopup={setPopup}
                    setDeletePopup={(value) => {
                      setDeletePopup(value);
                      if (value) {
                        setSelectedWorkflow(workflow);
                      }
                    }}
                  />
                ))
              ) : loading ? (
                <tr>
                  <td className="px-3 py-4 text-sm text-center" colSpan={9}>
                    Loading...
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    className="px-3 py-4 text-sm text-center text-red-500"
                    colSpan={9}
                  >
                    No workflows found. Please create a new workflow.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {popup && (
            <Popup
              heading="Are you sure you want to Execute the process 'Process_Name'?"
              text="You cannot Undo this step"
              confirmButton="Yes"
              cancelButton="No"
              onConfirm={() => setPopup(false)}
              onCancel={() => setPopup(false)}
            />
          )}
          {deletePopup && (
            <Popup
              heading={`Are you sure you want to Delete '${
                selectedWorkflow?.name || "Process"
              }'?`}
              text="You cannot Undo this step"
              confirmButton="Yes"
              cancelButton="No"
              onConfirm={handleDeleteWorkflow}
              onCancel={() => {
                setDeletePopup(false);
                setSelectedWorkflow(null);
              }}
            />
          )}
        </div>

        <nav className="w-full px-6 pt-4 pb-3 bg-white">
          <ul className="flex items-center justify-start gap-2 text-sm lg:justify-end">
            <li>
              <button className="px-3 leading-tight text-gray-500 ms-0">
                <BiSolidLeftArrow />
              </button>

              <button className="px-3 leading-tight text-gray-500 ms-0">
                <BiSolidRightArrow />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;

import { Link } from "react-router";

import { useState } from "react";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import TableCell from "../components/table/TableCell";
import Popup from "../components/table/Popup";
const Home = () => {
  const [demoData, setDemoData] = useState([0, 1, 2, 3, 4, 5]);
  const [popup, setPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  return (
    <div className="bg-slate-50 min-h-screen font-poppins">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold px-4">Workflow Builder</h1>

        <div className="py-10 flex flex-col sm:flex-row sm:justify-between gap-4 px-4">
          <div className="w-full sm:w-fit">
            <div className="max-w-80 relative">
              <input
                type="text"
                placeholder="Search By Workflow Name/ID"
                className="px-3 py-1.5 rounded border border-gray-300 w-full outline-none placeholder:text-sm sm:min-w-72"
              />
              <FaSearch className="absolute top-0 right-0 mt-3 mr-3 text-gray-400" />
            </div>
          </div>
          <Link
            to=""
            className="px-4 py-2 bg-gray-900 text-white rounded  hover:bg-gray-800 text-sm w-fit"
          >
            + Create New Process
          </Link>
        </div>

        <div className="bg-white px-8 py-4 overflow-x-auto">
          <table className="w-full rounded">
            <thead className="border-b border-red-600">
              <tr>
                <th className="py-3 font-medium text-nowrap">Workflow Name</th>
                <th className="py-3 font-medium">ID</th>
                <th className="py-3 font-medium text-nowrap">Last Edited On</th>
                <th className="py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {demoData.map((item) => (
                <TableCell
                  key={item}
                  setPopup={setPopup}
                  setDeletePopup={setDeletePopup}
                />
              ))}
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
              heading="Are you sure you want to Delete 'Process_Name'?"
              text="You cannot Undo this step"
              confirmButton="Yes"
              cancelButton="No"
              onConfirm={() => setDeletePopup(false)}
              onCancel={() => setDeletePopup(false)}
            />
          )}
        </div>

        <nav className="pt-4 pb-3 w-full px-6 bg-white">
          <ul className="flex items-center text-sm gap-2 justify-start lg:justify-end">
            <li>
              <a href="#" className="px-3 ms-0 leading-tight text-gray-500">
                <BiSolidLeftArrow />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 ms-0 leading-tight text-gray-500"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 ms-0 leading-tight text-gray-500 bg-orange-50"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="px-3 py-2 ms-0 leading-tight text-gray-500"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 ms-0 leading-tight text-gray-500"
              >
                4
              </a>
            </li>
            <li>
              <a href="#" className="px-3  ms-0 leading-tight text-gray-500">
                <BiSolidRightArrow />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Home;

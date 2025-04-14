import { HiDotsVertical } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useState } from "react";
import { RiShareBoxFill } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import TableAccordion from "./TableAccordion";
import { Link } from "react-router";

const TableCell = (props) => {
  const { workflow, setPopup, setDeletePopup } = props;
  const [accordion, setAccordion] = useState(false);
  const [morePopup, setMorePopup] = useState(false);
  const morePopupRef = useClickOutside(() => setMorePopup(false));

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";

    const formatDate = (date) => {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      return `${hours}:${minutes} IST - ${day}/${month}`;
    };

    if (timestamp.toDate) {
      return formatDate(timestamp.toDate());
    }

    if (timestamp instanceof Date) {
      return formatDate(timestamp);
    }

    return timestamp;
  };

  const handleDeleteClick = () => {
    setMorePopup(false);
    setDeletePopup(true);
  };

  return (
    <>
      {/* Main Table Row */}
      <tr className="border-b">
        <td className="px-3 py-4 text-sm min-w-40">{workflow.name}</td>
        <td className="px-3 py-4 text-sm min-w-40">{`#${workflow.id}`}</td>
        <td className="px-3 py-4 text-sm min-w-40">
          {formatTimestamp(workflow.last_updated)}
        </td>
        <td className="px-3 py-4 text-sm min-w-40">{workflow.description}</td>
        <td className="px-3 py-4">
          <AiFillPushpin />
        </td>
        <td className="px-3 py-4 text-sm">
          <button
            type="button"
            className="px-2 py-1 text-sm border border-gray-300 rounded"
            onClick={() => setPopup(true)}
          >
            Execute
          </button>
        </td>
        <td className="px-3 py-4 text-sm">
          <Link
            to={`/edit-workflow/${workflow.id}`}
            className="px-2 py-1 text-sm border border-gray-300 rounded"
          >
            Edit
          </Link>
        </td>
        <td className="relative px-3 py-4">
          <HiDotsVertical
            onClick={() => setMorePopup(true)}
            className="cursor-pointer"
          />
          {morePopup && (
            <div
              ref={morePopupRef}
              className="absolute px-2 py-1 bg-white rounded-md shadow-md -bottom-5 right-5"
              id="more-popup"
            >
              <button
                className="text-sm font-medium tracking-wider text-red-500 uppercase"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          )}
        </td>
        <td className="px-3 py-4">
          <IoMdArrowRoundDown
            className={`cursor-pointer transform transition-transform duration-300 ${
              accordion ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setAccordion(!accordion)}
          />
        </td>
      </tr>
      <TableAccordion accordion={accordion} workflow={workflow} />
    </>
  );
};

export default TableCell;

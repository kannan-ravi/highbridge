import { HiDotsVertical } from "react-icons/hi";
import { AiFillPushpin } from "react-icons/ai";
import { IoMdArrowRoundDown } from "react-icons/io";
import { useState } from "react";
import { RiShareBoxFill } from "react-icons/ri";
import useClickOutside from "../../hooks/useClickOutside";
import TableAccordion from "./TableAccordion";
const TableCell = (props) => {
  const { setPopup, setDeletePopup } = props;
  const [accordion, setAccordion] = useState(false);
  const [morePopup, setMorePopup] = useState(false);
  const morePopupRef = useClickOutside(() => setMorePopup(false));

  return (
    <>
      {/* Main Table Row */}
      <tr className="border-b">
        <td className="px-3 py-4 text-sm">Workflow Name here...</td>
        <td className="px-3 py-4 text-sm">#494</td>
        <td className="px-3 py-4 text-sm">Zubin Khanna | 22:43 IST - 28/05</td>
        <td className="px-3 py-4 text-sm">
          Some description here regarding the flow..
        </td>
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
          <button
            type="button"
            className="px-2 py-1 text-sm border border-gray-300 rounded"
          >
            Edit
          </button>
        </td>
        <td className="px-3 py-4 relative">
          <HiDotsVertical
            onClick={() => setMorePopup(true)}
            className="cursor-pointer"
          />
          {morePopup && (
            <div
              ref={morePopupRef}
              className="absolute -bottom-5 right-5 bg-white rounded-md shadow-md px-2 py-1"
              id="more-popup"
            >
              <button
                className="text-red-500 uppercase text-sm tracking-wider font-medium"
                onClick={() => setDeletePopup(true)}
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
      <TableAccordion accordion={accordion} />
    </>
  );
};

export default TableCell;

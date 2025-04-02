import React from "react";
import { RiShareBoxFill } from "react-icons/ri";

const TableAccordion = (props) => {
  const { accordion } = props;
  return (
    <tr className={`${accordion ? "max-h-0" : "hidden"}`}>
      <td colSpan="9" className="p-0">
        <table className="w-full bg-yellow-50">
          <tbody className="flex flex-col gap-4 py-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <tr key={index} className="flex gap-4 items-center">
                  <td className="px-4 py-2 w-fit" colSpan={2}>
                    28/05 - 22:43 IST
                  </td>
                  <td
                    className="px-3 py-1 bg-green-200 rounded w-fit"
                    colSpan={2}
                  >
                    Passed
                  </td>
                  <td className="px-4 w-fit" colSpan={5}>
                    <RiShareBoxFill className="text-lg" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default TableAccordion;

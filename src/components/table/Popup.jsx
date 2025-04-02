import React from "react";
import { IoCloseSharp } from "react-icons/io5";

const Popup = (props) => {
  const { heading, text, confirmButton, cancelButton, onConfirm, onCancel } =
    props;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="px-10 pt-20 pb-6 text-center transition-transform transform bg-white rounded-lg shadow-lg min-w-96 animate-scaleUp">
        <IoCloseSharp
          onClick={onCancel}
          className="absolute text-2xl cursor-pointer top-8 right-8"
        />
        <div className="mb-10">
          <h2 className="mb-4 text-lg font-semibold capitalize">{heading}</h2>
          <p className="font-medium text-red-500 capitalize">{text}</p>
        </div>
        <div className="py-6">
          <hr />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 text-sm font-medium tracking-wide border rounded"
            onClick={onConfirm}
          >
            {confirmButton}
          </button>
          <button
            className="px-4 py-2 text-sm font-medium tracking-wide border rounded"
            onClick={onCancel}
          >
            {cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;

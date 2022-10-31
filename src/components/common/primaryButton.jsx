import React from "react";

const PrimaryButton = (props) => {
  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >{props.text}</button>
  );
};

export default PrimaryButton;

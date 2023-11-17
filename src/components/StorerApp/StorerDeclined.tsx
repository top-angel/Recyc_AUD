import React, { useState } from "react";

interface StorerQueryProp {
  setSelectedIndex: (index: number) => void;
}

function StorerDeclined(props: StorerQueryProp) {
  const handleSelect = (index: number) => {
    props.setSelectedIndex(index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between w-full">
        <div className="mb-6 text-lg font-semibold text-left">
          Storer Application Details
        </div>
        <div
          className="text-xs hover:cursor-pointer"
          onClick={() => handleSelect(0)}
        >
          Reevaluate
        </div>
      </div>
      <textarea
        placeholder={`\n\n\n\n\n\n\n\n\n\n\n\n\n\n Applicated Declined`}
        rows={30}
        className="w-full px-3 py-2 mt-2 text-sm text-center rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
      ></textarea>
    </div>
  );
}

export default StorerDeclined;

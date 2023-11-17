import React, { useState } from "react";

interface StorerQueryProp {
  setSelectedIndex: (index: number) => void;
}

function StorerApproved(props: StorerQueryProp) {
  const handleSelect = (index: number) => {
    props.setSelectedIndex(index);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between w-full">
        <div className="mb-6 text-lg font-semibold text-left">
          Storer Application Details
        </div>
        <div className="text-xs">11.07.2023</div>
      </div>
      <div className="w-full text-sm text-left">
        Comments About the Decision
      </div>
      <textarea
        placeholder={`· Rewrite the description and opening hours in detail, \n· Address could not be found in Google Maps`}
        rows={20}
        className="w-full px-3 py-2 mt-10 text-sm rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
      ></textarea>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter your Comments"
          className="w-full px-3 py-2 pr-10 mt-8 text-sm bg-no-repeat rounded-md bg-lightwhite text-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
        ></input>
        <div className="absolute top-9 right-3 hover:cursor-pointer">
          <img src="../../assets/images/telegram.png"></img>
        </div>
      </div>

      <div className="flex flex-row justify-between w-full mt-10">
        <button
          className="w-1/6 px-3 py-2 mt-3 text-sm text-center text-white rounded-md bg-darkgray outline outline-1 outline-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
          onClick={() => handleSelect(0)}
        >
          Cancel
        </button>
        <button
          className="w-4/5 px-3 py-2 mt-3 text-sm text-center text-white rounded-md bg-rose-700 bg-lightred outline outline-1 focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
          onClick={() => handleSelect(1)}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

export default StorerApproved;

import React from "react";

const MissionDeclined = () => {
  return (
    <div>
      <div className="mx-auto flex w-full flex-col rounded-lg bg-gray p-6 shadow">
        <div className="flex justify-between">
          <div className="mb-6 text-left font-primary text-lg font-semibold text-darkgray">
            Mission Creator Application Details
          </div>
          <div className="mb-6 text-left font-primary text-xs font-normal text-darkgray">
            Re-Evaluate
          </div>
        </div>
        <div className="flex h-[691px] items-center justify-center rounded-xl bg-white p-6 font-primary text-sm font-normal text-darkgray">
          Application Declined
        </div>
      </div>
    </div>
  );
};

export default MissionDeclined;

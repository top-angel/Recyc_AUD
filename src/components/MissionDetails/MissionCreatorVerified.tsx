import React from "react";
import Image from "next/image";

const MissionCreatorVerified = () => {
  return (
    <div>
      <div className="mx-auto flex w-full flex-col rounded-lg bg-gray p-6 shadow">
        <div className="flex justify-between">
          <div className="mb-6 text-left font-primary text-lg font-semibold text-darkgray">
            Mission Creator Application Details
          </div>
          <div className="mb-6">
            <Image
              src={"/assets/images/mission-creator-verified.svg"}
              alt="verified"
              width="24"
              height="24"
            />
          </div>
        </div>
        <div className="h-[691px] rounded-xl bg-white p-6 font-primary text-darkgray">
          <div className="ml-6 mr-6 mt-6 text-2xl font-bold">
            Mission Creator has been verified
          </div>
          <div className="ml-6 mr-6 mt-2 text-sm font-normal">
            Mission Creator ‘Coca-Cola’ is now active.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCreatorVerified;

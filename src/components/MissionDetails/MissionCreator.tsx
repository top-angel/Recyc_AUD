import React from "react";
import Logs from "../Logs/Logs";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";

const MissionCreator = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-7">
          <div className="w-1/2">
            <Logs type="creator" />
          </div>
          <div className="w-1/3 h-full">
            <Missions type="creator" />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="w-full">
              <Incidents />
            </div>
            <div className="w-full mt-4">
              <Earnings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionCreator;

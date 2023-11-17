import React, { useState, useEffect } from "react";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";
import Logs from "../Logs/Logs";

function StorerFlowLog() {
  return (
    <div className="flex items-center justify-center w-full mb-5 border border-dotted rounded-xl border-darkgray">
      <div className="flex flex-row gap-10 p-7">
        <div className="w-[650px]">
          <Logs type="storer" />
        </div>
        <div className="w-[400px]">
          <Missions type="storer" />
        </div>
        <div className="flex flex-col gap-5">
          <Incidents />
          <div className="h-[285px]">
            <Earnings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorerFlowLog;

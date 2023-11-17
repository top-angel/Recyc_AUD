import React, { useState, useEffect } from "react";
import StorerApp from "../StorerApp/StorerApp";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";

function StorerFlowQuery() {
  return (
    <div className="flex items-center justify-center w-full rounded-xl border-darkgray">
      <div className="flex flex-row gap-10 p-7">
        <div className="w-[650px]">
          <StorerApp />
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

export default StorerFlowQuery;

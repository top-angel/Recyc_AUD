import React, { useState } from "react";
import ActiveLocation from "../ActiveLocation/ActiveLocation";

function MissionMapCard() {
  return (
    <div className="flex flex-col p-5 rounded-xl bg-gray font-primary">
      <ActiveLocation />
    </div>
  );
}

export default MissionMapCard;

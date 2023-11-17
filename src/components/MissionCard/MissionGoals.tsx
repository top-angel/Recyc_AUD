import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

function MissionGoals() {
  return (
    <div>
      <ProgressBar
        percentage={10}
        bgcolor={"bg-primary"}
        label={"Returned Items"}
        value={"7182/500,000"}
        className={"font-primary bg-gray rounded-xl p-5"}
      />
    </div>
  );
}

export default MissionGoals;

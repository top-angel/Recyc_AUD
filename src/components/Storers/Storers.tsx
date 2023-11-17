import React, { useState, useEffect } from "react";
import StorerFlowQuery from "./StorerFlowQuery";
import MissionCard from "../MissionCard/MissionCard";
import StorerFlowLog from "./StorerFlowLog";
import Card from "../Card/Card";

function Storers() {
  return (
    <Card>
      <StorerFlowQuery />
      <StorerFlowLog />
      <MissionCard type="storer" />
    </Card>
  );
}

export default Storers;

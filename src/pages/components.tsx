import React from "react";
import Logs from "../components/Logs/Logs";
import Missions from "../components/Missions/Missions";
import TabHeader from "src/components/TabHeader/TabHeader";
import Leaderboard from "src/components/Leaderboard/Leaderboard";
import Earnings from "src/components/Earnings/Earnings";
import Incidents from "src/components/Incidents/Incidents";
import StorerApp from "src/components/StorerApp/StorerApp";
import MissionCard from "src/components/MissionCard/MissionCard";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

function Components() {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="w-[550px]">
          <TabHeader />
        </div>
      </div>
      <div className="flex h-fullScreen flex-col items-center gap-10 font-primary lg:flex-row lg:justify-center">
        <div className="w-[650px]">
          <Logs type="collector" />
        </div>
        <div className="w-[400px]">
          <Missions type="collector" />
        </div>
      </div>
      <div className="mb-6 mt-6">
        <Earnings />
      </div>
      <div className="mb-6 mt-6">
        <Incidents />
      </div>
      <div className="mb-6 mt-6">
        <Leaderboard />
      </div>
      <div className="my-16 flex w-full items-center justify-center">
        <div className="w-[650px]">
          <StorerApp />
        </div>
      </div>
      <div className="mb-12 flex w-full items-center justify-center">
        <div className="h-[900px] w-[1600px]">
          <MissionCard type="collector" />
        </div>
      </div>
    </Main>
  );
}

export default Components;

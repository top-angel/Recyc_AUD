import React, { useEffect } from "react";
import Logs, { LogList } from "../components/Logs/Logs";
import Missions from "../components/Missions/Missions";
import TabHeader from "src/components/TabHeader/TabHeader";
import Leaderboard from "src/components/Leaderboard/Leaderboard";
import Earnings from "src/components/Earnings/Earnings";
import Incidents from "src/components/Incidents/Incidents";
import StorerApp from "src/components/StorerApp/StorerApp";
import MissionCard from "src/components/MissionCard/MissionCard";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "src/redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { AppState } from "src/redux/store";

export interface AggregatedData {
  collector_details: object;
  incidents: object[];
  logs: LogList;
  missions: object[];
  total_earning_chat: object[];
}

function Components() {
  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();
  const aggregated_data = useSelector((state: AppState) => {
    return state ? state.user.aggregated_data : null;
  });

  useEffect(() => {
    dispatch(userActions.aggregatedData({ accessToken }));
  }, []);

  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="w-[550px]">
          <TabHeader />
        </div>
      </div>
      <div className="flex h-fullScreen flex-col items-center gap-10 font-primary lg:flex-row lg:justify-center">
        <div className="w-[650px]">
          <Logs logData={aggregated_data?.logs} type="collector" />
        </div>
        <div className="w-[400px]">
          <Missions missionData={aggregated_data?.missions} type="collector" />
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
function dispatch(arg0: { payload: { accessToken: string }; type: string }) {
  throw new Error("Function not implemented.");
}

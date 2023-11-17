import React, { useState } from "react";
import MissionHeader from "./MissionHeader";
import Logs from "../Logs/Logs";
import Leaderboard from "../Leaderboard/Leaderboard";
import MissionGoals from "./MissionGoals";
import MissionFooter from "./MissionFooter";
import MissionMapCard from "./MissionMapCard";
import Card from "../Card/Card";

interface MissionCardProps {
  type: "collector" | "creator" | "storer";
}

function MissionCard({ type }: MissionCardProps) {
  return (
    <div className="justify-center p-5 border border-dotted rounded-xl border-gray">
      <div className="flex justify-center w-full">
        <MissionHeader />
      </div>
      <div className="flex flex-col gap-3 p-7">
        <div className="flex flex-row gap-7">
          <div className="w-1/2">
            <Logs type={type} />
          </div>
          <div className="w-1/3 h-full">
            <Leaderboard />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="w-full">
              <MissionGoals />
            </div>
            <div className="w-full mt-4">
              <MissionMapCard />
            </div>
            <div className="w-full mt-4">
              <MissionFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MissionCard;

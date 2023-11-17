import React, { useState } from "react";
import { useRouter } from "next/router";
import InnerHeader from "src/components/_Layout/InnerHeader/InnerHeader";
import Earnings from "../Earnings/Earnings";
import Incidents from "../Incidents/Incidents";
import Missions from "../Missions/Missions";
import { myMissionData } from "../../utils/MissionData";
import Logs from "../Logs/Logs";
import ChatSlide from "../ChatSlide/ChatSlide";

interface Props {
  pathdetails?: any;
}

// const myHeaderData = ["Queued", "Ongoing", "Finished"];
const myHeaderData = ["", " ", ""];
const headerData = ["Stored(138)", "Returned(71)"];

const StorerDetails = ({ pathdetails }: Props) => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };
  return (
    <div>
      <InnerHeader
        type="Storer"
        verified={true}
        avatar="https://randomuser.me/api/portraits/med/men/1.jpg"
        title="Mo's Garage"
        totalEarned={358.78}
        incident={1}
        stored={1000}
        returned={400}
        missions={15}
        address="0xf7NdoiNln58SSjtusfgtiin"
        onClick={toggleSlide}
      />
      <div className="flex flex-col gap-3 p-7">
        <div className="flex flex-row gap-7">
          <div className="w-1/2">
            <Logs type="storer" headerData={headerData} />
          </div>
          <div className="h-full w-1/3">
            <Missions
              missionData={myMissionData}
              headerData={myHeaderData}
              missiontype="storer"
              type="someType"
            />
          </div>
          <div className="flex w-1/3 flex-col">
            <div className="w-full">
              <Incidents />
            </div>
            <div className="mt-4 w-full">
              <Earnings />
            </div>
          </div>
        </div>
      </div>
      {isSlideVisible && (
        <ChatSlide
          type="Storer"
          avatar="https://randomuser.me/api/portraits/med/men/1.jpg"
          title="Mo's Garage"
          scanned={300}
          stored={1000}
          returned={400}
          missions={15}
          onClose={toggleSlide}
        />
      )}
    </div>
  );
};

export default StorerDetails;

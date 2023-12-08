import React, { useState } from "react";
import Logs from "../Logs/Logs";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";
import InnerHeader from "../_Layout/InnerHeader/InnerHeader";
import StorerApp from "../StorerApp/StorerApp";
import ChatSlide from "../ChatSlide/ChatSlide";

import { useRouter } from "next/router";

interface MissionData {
  title: string;
  company: string;
  amount: number;
  imageUrl: string;
}

const Storer = ({ data }: any) => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };

  return (
    <>
      <InnerHeader
        type="Storer"
        verified={false}
        avatar="https://randomuser.me/api/portraits/med/men/1.jpg"
        title={data?.profile?.name || ""}
        totalEarned={358.78}
        incident={1}
        stored={1000}
        returned={400}
        missions={15}
        address={data?.profile?.address || ""}
        onClick={toggleSlide}
      />
      <div className="flex flex-col gap-3 p-7">
        <div className="flex flex-row gap-7">
          <div className="w-1/2">
            <StorerApp storerData={data}/>
          </div>
          <div className="h-full w-1/3">
            <Missions missionData={[]} headerData={[]} type="someType" />
          </div>
          <div className="flex w-1/3 flex-col">
            <div className="w-full">
              <Incidents />
            </div>
            <div className="mt-4 w-full">
              <Earnings data={[]} />
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
    </>
  );
};

export default Storer;

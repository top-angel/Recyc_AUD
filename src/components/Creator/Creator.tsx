import React, { useState } from "react";
import InnerHeader from "../../components/_Layout/InnerHeader/InnerHeader";
import MissionMain from "../MissionDetails/MissionMain";
import MissionUnMain from "../MissionDetails/MissionUnMain";
import ChatSlide from "../ChatSlide/ChatSlide";

type creatorProps = {
  verifiedStatus: boolean;
  data: any;
};

const Creator = ({ verifiedStatus, data }: creatorProps) => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const { address, company_title } = data;

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };
  return (
    <div className="relative">
      <InnerHeader
        type="Mission"
        verified={verifiedStatus}
        avatar="https://randomuser.me/api/portraits/med/men/52.jpg"
        title={company_title}
        totalRewarded={104.78}
        incident={0}
        successRate={95}
        scanned={300}
        stored={100}
        returned={500}
        missions={15}
        address={address}
        onClick={toggleSlide}
      />
      <div className="p-7">
        {verifiedStatus ? <MissionMain /> : <MissionUnMain />}
      </div>
      {isSlideVisible && (
        <ChatSlide
          type="Mission Creator"
          avatar="https://randomuser.me/api/portraits/med/men/52.jpg"
          title="Samuel Martin"
          scanned={300}
          stored={100}
          returned={500}
          missions={15}
          onClose={toggleSlide}
        />
      )}
    </div>
  );
};

export default Creator;

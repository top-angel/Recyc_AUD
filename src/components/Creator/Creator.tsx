import React, { useState } from "react";
import InnerHeader from "../../components/_Layout/InnerHeader/InnerHeader";
import MissionMain from "../MissionDetails/MissionMain";
import MissionUnMain from "../MissionDetails/MissionUnMain";
import ChatSlide from "../ChatSlide/ChatSlide";
import { useAppSelector } from "src/redux/hooks";

type creatorProps = {
  verifiedStatus: boolean;
  data: any;
};

const Creator = ({ verifiedStatus, data }: creatorProps) => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };

  const { profileStatus } = useAppSelector((s) => ({
    profileStatus: s.user.profileStatus,
  }));


  return (
    <div className="relative">
      <InnerHeader
        type="Mission"
        verified={profileStatus ? true : verifiedStatus}
        avatar="https://randomuser.me/api/portraits/med/men/52.jpg"
        title={data?.profile?.company_title || "unknown"}
        totalRewarded={104.78}
        incident={0}
        successRate={95}
        scanned={300}
        stored={100}
        returned={500}
        missions={15}
        address={data?.public_address || "empty address"}
        onClick={toggleSlide}
      />
      <div className="p-7">
        {verifiedStatus ? <MissionMain /> : <MissionUnMain data={data}/>}
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

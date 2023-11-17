import React, { useState } from "react";
import { useRouter } from "next/router";
import InnerHeader from "src/components/_Layout/InnerHeader/InnerHeader";
import MissionCard from "../MissionCard/MissionCard";
import ChatSlide from "../ChatSlide/ChatSlide";

interface Props {
  pathdetails?: any;
}

const CollectorDetails = ({ pathdetails }: Props) => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };
  return (
    <div>
      <InnerHeader
        type="Collector"
        verified={true}
        avatar="https://randomuser.me/api/portraits/med/men/52.jpg"
        title="Samuel Martin"
        totalRewarded={104.78}
        incident={0}
        successRate={95}
        scanned={300}
        stored={100}
        returned={500}
        missions={15}
        address="0xf7NdoiNln58SSjtusfgtiin"
        onClick={toggleSlide}
      />
      <div className="p-7">
        <MissionCard type="collector" />
      </div>
      {isSlideVisible && (
        <ChatSlide
          type="Collector"
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

export default CollectorDetails;

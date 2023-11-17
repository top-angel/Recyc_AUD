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
      <div className="p-7">
        <MissionCard type="collector" />
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

export default CollectorDetails;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InnerHeader from "src/components/_Layout/InnerHeader/InnerHeader";
import Earnings from "../Earnings/Earnings";
import Incidents from "../Incidents/Incidents";
import Missions from "../Missions/Missions";
import { myMissionData } from "../../utils/MissionData";
import Logs from "../Logs/Logs";
import ChatSlide from "../ChatSlide/ChatSlide";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { useAuthContext } from "src/context/AuthProvider";
import { userActions } from "src/redux/user/userSlice";
import LoadingSpinner from "../LoadSpinner/LoadSpinner";

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

  const { isDataLoading, newStorers } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    newStorers: s.user.newStorers,
  }));

  function findObjectById(array, id) {
    return array.find(item => item._id === id);
  }

  let targetId = pathdetails.toString(); 
  let resultObject = findObjectById(newStorers, targetId);

  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id = targetId; 
    const profileStatusData = {
      status: 'verified',
      status_reason: 'reasons',
    };
    dispatch(userActions.updateProfileStatus({ id, token: accessToken, profileStatusData }));
  },[])

  if (isDataLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div>
      <InnerHeader
        type="Storer"
        verified={true}
        avatar="https://randomuser.me/api/portraits/med/men/1.jpg"
        title={resultObject?.profile?.name || "unknown"}
        totalEarned={358.78}
        incident={1}
        stored={1000}
        returned={400}
        missions={15}
        address={resultObject?.public_address || "0xf7NdoiNln58SSjtusfgtiin"}
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

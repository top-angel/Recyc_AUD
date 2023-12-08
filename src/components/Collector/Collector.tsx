import React, { useEffect, useState } from "react";
import Logs from "../Logs/Logs";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";
import InnerHeader from "../../components/_Layout/InnerHeader/InnerHeader";
import ChatSlide from "../ChatSlide/ChatSlide";
import { userActions } from "../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

const Collector = () => {
  const [isSlideVisible, setIsSlideVisible] = useState(false);

  const toggleSlide = () => {
    setIsSlideVisible(!isSlideVisible);
  };
  const { selectedUser } = useAppSelector((s) => ({
    selectedUser: s.user.selectedUser,
  }));

  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();

  const { isDataLoading, aggregatedDetailsData } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,

    aggregatedDetailsData: s.user.aggregatedDetailsData,
  }));

  useEffect(() => {
    const id = "ACyBghHZcR"; 
    dispatch(userActions.aggregatedDetailsData({ accessToken, id}));
  },[])

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {selectedUser ? (
        <div>
          <InnerHeader
            type="Collector"
            verified={true}
            avatar="/assets/images/mo-garage.png"
            title={selectedUser._id}
            totalRewarded={0}
            incident={0}
            successRate={0}
            scanned={selectedUser.scanned_count}
            stored={selectedUser.stored_count}
            returned={selectedUser.returned_count}
            missions={222}
            address={selectedUser.public_address}
            onClick={toggleSlide}
          />
          <div className="flex flex-col gap-3 p-7">
            <div className="flex flex-row gap-7">
              <div className="w-1/2">
                <Logs type="collector" />
              </div>
              <div className="h-full w-1/3">
                <Missions type="colletor" />
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
      ) : (
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
          <div className="flex flex-col gap-3 p-7">
            <div className="flex flex-row gap-7">
              <div className="w-1/2">
                <Logs type="collector" />
              </div>
              <div className="h-full w-1/3">
                <Missions type="colletor" />
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
      )}
    </>
  );
};

export default Collector;

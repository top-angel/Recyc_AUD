import React, { useEffect } from "react";
import Logs from "../Logs/Logs";
import Missions from "../Missions/Missions";
import Incidents from "../Incidents/Incidents";
import Earnings from "../Earnings/Earnings";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { userActions } from "src/redux/user/userSlice";
import LoadingSpinner from "../LoadSpinner/LoadSpinner";

const MissionCreator = () => {
  const { accessToken } = useAuthContext();
  const dispatch = useAppDispatch();
  const { isDataLoading } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
  }));

  useEffect(() => {
    const urlPath = window.location.pathname;
    const creatorId = urlPath.split('/creator/')[1];
    const profileStatusData = {
      status: 'verified',
      status_reason: 'reasons',
    };
    dispatch(userActions.updateProfileStatus({ id: creatorId, token: accessToken, profileStatusData }));
  },[])

  if (isDataLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-7">
          <div className="w-1/2">
            <Logs type="creator" />
          </div>
          <div className="w-1/3 h-full">
            <Missions type="creator" />
          </div>
          <div className="flex flex-col w-1/3">
            <div className="w-full">
              <Incidents />
            </div>
            <div className="w-full mt-4">
              <Earnings />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MissionCreator;

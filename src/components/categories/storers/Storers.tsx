import React, { useEffect } from "react";
import Leaderboard from "./Leaderboard";
import VerificationQueue from "./VerificationQueue";
import RecentVerified from "./RecentVerified";

import { userActions } from "../../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

const Storers = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, storers } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,

    storers: s.user.storers,
  }));

  useEffect(() => {
    dispatch(userActions.getStorers({ token: accessToken }));
  }, []);

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  if (storers === undefined) {
    return <></>;
  }

  return (
    <div className="pt-5 px-7">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold font-primary text-darkgray">
          Storers
        </div>
        <div className="rounded-xl bg-green bg-opacity-20 px-1.5 py-1 font-primary text-sm font-semibold text-green">
          {storers?.top_storers?.length}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <VerificationQueue />
        <div className="col-span-2 ">
          {storers.top_storers && (
            <Leaderboard members={storers?.top_storers} />
          )}
        </div>
        {/* <RecentVerified members={storers?.verified_storers.result} /> */}
      </div>
    </div>
  );
};

export default Storers;

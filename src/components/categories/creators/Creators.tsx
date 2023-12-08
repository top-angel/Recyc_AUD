import React, { useEffect } from "react";
import Leaderboard from "./Leaderboard";
import VerificationQueue from "./VerificationQueue";

import { userActions } from "../../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";

import RecentVerified from "./RecentVerified";
import storers from "src/pages/storers";

const Creators = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, creators } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,

    creators: s.user.creators,
  }));

  useEffect(() => {
    dispatch(userActions.getCreators({ token: accessToken }));
  }, []);

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  if (creators === undefined) {
    return <></>;
  }

  return (
    <div className="pt-5 px-7">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold font-primary text-darkgray">
          Creators
        </div>
        <div className="rounded-xl bg-purple bg-opacity-20 px-1.5 py-1 font-primary text-sm font-semibold text-purple">
          {creators?.top_creators?.length}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        <VerificationQueue />
        <div className="col-span-2 ">
          <Leaderboard members={creators?.top_creators} />
        </div>
        {/* <RecentVerified members={creators?.verified_creators.result} /> */}
      </div>
    </div>
  );
};

export default Creators;

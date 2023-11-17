import React, { useEffect } from "react";
import Leaderboard from "./Leaderboard";
import RecentCollectors from "./RecentCollectors";

import { userActions } from "../../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";
import collectors from "src/pages/collectors";

const Collectors = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();

  const { isDataLoading, collectors } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
    collectors: s.user.collectors,
  }));

  useEffect(() => {
    dispatch(userActions.getCollectors({ token: accessToken }));
  }, []);

  if (isDataLoading) {
    return <LoadingSpinner />;
  }

  if (collectors === undefined) {
    return <></>;
  }

  return (
    <div className="pt-5 px-7">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold font-primary text-darkgray">
          Collectors
        </div>
        <div className="text-sm font-primary text-darkgray bg-gray rounded-xl py-1 px-1.5 font-semibold">
          {collectors?.top_collectors?.length}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        <RecentCollectors members={collectors?.verified_collectors?.result} />
        <div className="col-span-3 ">
          <Leaderboard members={collectors?.top_collectors} />
        </div>
      </div>
    </div>
  );
};

export default Collectors;

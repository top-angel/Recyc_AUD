import React, { useEffect } from "react";

import VerificationQueue from "../../../components/VerificationQueue/VerificationQueue";
import TopTenBox from "../../../components/TopTenBox/TopTenBox";
import GlobalProgress from "../../../components/GlobalProgress/GlobalProgress";
import ActiveLocation from "../../../components/ActiveLocation/ActiveLocation";
import { useAppSelector } from "../../../redux/hooks";
import LoadingSpinner from "src/components/LoadSpinner/LoadSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useAuthContext } from "src/context/AuthProvider";
import { userActions } from "src/redux/user/userSlice";

const Dashboard = () => {
  const { isDataLoading } = useAppSelector((s) => ({
    isDataLoading: s.user.isDataLoading,
  }));

  const dispatch = useDispatch();
  const { accessToken } = useAuthContext();

  useEffect(() => {
    if (accessToken) {
      dispatch(
        userActions.pendingUsers({
          page_size: 2,
          page: 1,
          role: "creator",
          accessToken: accessToken,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
      {isDataLoading ? (
        <LoadingSpinner className="-mt-12" />
      ) : (
        <div className="grid grid-cols-4 gap-5 px-7 pt-5">
          <VerificationQueue />
          <div className="z-[-1] col-span-2">
            <TopTenBox />
          </div>
          <div className="flex flex-col gap-5">
            <GlobalProgress />
            <ActiveLocation />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

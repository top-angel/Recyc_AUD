import React, { useEffect } from "react";
import Card from "../../Card/Card";
import Image from "next/image";

import { userActions } from "../../../redux/user/userSlice";
import { useAuthContext } from "src/context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useRouter } from "next/router";

const VerificationQueue = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAuthContext();
  const router = useRouter();

  const { newCreators } = useAppSelector((s) => ({
    newCreators: s.user.newCreators,
  }));

  useEffect(() => {
    dispatch(
      userActions.getAllNewCreators({ token: accessToken, pageSize: 100 })
    );
  }, []);

  if (newCreators === undefined) return <></>;

  const approveCreateHandle = ({ _id }: any) => {
    router.push(`/creator/${_id}`);
    dispatch(userActions.setProfileStatus(false));
  };

  return (
    <Card fullHeight>
      <div className="flex justify-between ">
        <div className="text-lg font-semibold text-darkgray font-primary">
          Verification Queue
        </div>
        <div className="text-base text-darkgray">{newCreators.length}</div>
      </div>
      <div className="flex flex-col mt-4 space-y-3 ">
        {newCreators && newCreators[0] === "loading" && (
          <div className="flex items-center justify-center">
            {loadingSpinner}
          </div>
        )}
        {newCreators &&
          newCreators[0] !== "loading" &&
          newCreators.map((item: any, index: number) => {
            const { profile, created_at, _id } = item;
            const date: any = new Date(created_at);
            return (
              <div
                className="flex items-start w-full gap-3 p-3 bg-white rounded-lg cursor-pointer hover:opacity-90"
                key={index}
                onClick={() => approveCreateHandle({ _id })}
              >
                <div className="w-full">
                  <div className="flex items-center w-full gap-1">
                    <span className="text-base font-primary text-darkgray">
                      <strong>{profile?.company_title}</strong> wants to become
                      a creator
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm font-light font-primary text-darkgray">
                      {date.toLocaleTimeString()}
                    </div>
                    <div className="text-sm font-light font-primary text-darkgray">
                      {profile?.city} {profile?.country}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </Card>
  );
};

export default VerificationQueue;

const loadingSpinner = (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1" y="4" width="6" height="14" opacity="1">
      <animate
        id="spinner_rQ7m"
        begin="0;spinner_2dMV.end-0.25s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
    <rect x="9" y="4" width="6" height="14" opacity=".4">
      <animate
        begin="spinner_rQ7m.begin+0.15s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
    <rect x="17" y="4" width="6" height="14" opacity=".3">
      <animate
        id="spinner_2dMV"
        begin="spinner_rQ7m.begin+0.3s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </rect>
  </svg>
);

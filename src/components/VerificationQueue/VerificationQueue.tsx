import React, { useEffect } from "react";

import Image from "next/image";
import Card from "../Card/Card";
import missionIcon from "public/assets/images/icon1.svg";
import storeIcon from "public/assets/images/icon2.svg";
import { useAppSelector } from "src/redux/hooks";

interface IPendingUser {
  _id: string;
  claims: string[];
  created_at: number;
  profile: {
    address: string;
    company_title: string;
    country: string;
    email: string;
  };
}

const VerificationQueue = ({ members }: any) => {
  // const { pendingUsers } = useAppSelector((s) => ({
  //   pendingUsers: s.user.pendingUsers,
  // }));

  // const transformedData =
  //   pendingUsers && pendingUsers.length > 0
  //     ? pendingUsers.map((user: IPendingUser) => {
  //         const { profile, created_at, claims } = user;
  //         const formattedDate = new Date(created_at * 1000).toLocaleDateString(
  //           "en-US",
  //           {
  //             year: "numeric",
  //             month: "short",
  //             day: "numeric",
  //           }
  //         );

  //         return {
  //           name: profile?.company_title,
  //           action: claims[0],
  //           date: formattedDate,
  //           location: profile?.country,
  //         };
  //       })
  //     : [];

  return (
    <Card fullHeight>
      <div className="text-lg font-semibold font-primary text-darkgray">
        Verification Queue
      </div>
      <div className="flex flex-col mt-4 space-y-6">
        {members?.length === 0 ? (
          <div className="text-lg font-primary text-darkgray">
            No pending users.
          </div>
        ) : (
          members?.map((item, index) => {
            const { profile, created_at, claims } = item;
            const date: any = new Date(created_at);
            return (
              <div
                className="flex items-start w-full gap-3 p-3 bg-white rounded-lg"
                key={index}
              >
                {/* <Image
                  src={action === "mission" ? missionIcon : storeIcon}
                  alt="icon"
                  width={32}
                  height={32}
                /> */}
                <div className="w-full">
                  <div className="flex items-center w-full gap-1">
                    <span className="text-lg font-semibold font-primary text-darkgray">
                      {profile.name}
                      {claims[0] === "creator" && "wants to create a mission"}
                      {claims[0] === "storer" && "wants to become a storer"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-sm font-light font-primary text-darkgray">
                      {date.toLocaleTimeString()}
                    </div>
                    <div className="text-sm font-light font-primary text-darkgray">
                      {profile.city} {profile.country}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};

export default VerificationQueue;

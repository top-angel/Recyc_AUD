import React from "react";

import Image from "next/image";
import Card from "../../Card/Card";
import missionIcon from "public/assets/images/icon1.svg";
import storeIcon from "public/assets/images/icon2.svg";

const data = [
  {
    name: "Coca-Cola",
    action: "mission",
    date: "Jul 9",
    location: "Santa Fe",
  },
  {
    name: "Ivan",
    action: "storer",
    date: "Jul 9",
    location: "Belgrade",
  },
];

interface IVerificationItem {
  name: string;
  action: string;
  date: string;
  location: string;
}

const RecentCollectors = ({ members }: any) => {
  return (
    <Card>
      <div className="flex justify-between">
        <div className="text-lg font-semibold text-darkgray font-primary">
          Recently became a collector
        </div>
        <div className="text-base text-darkgray">{members.length}</div>
      </div>
      <div className="flex flex-col mt-4 space-y-6">
        {members.map((item: IVerificationItem, index: number) => {
          const { action, name, date, location } = item;
          return (
            <div
              className="flex items-start w-full gap-3 p-3 bg-white rounded-lg"
              key={index}
            >
              <div className="w-full">
                <div className="flex items-center w-full gap-1">
                  <span className="text-lg font-semibold font-primary text-darkgray">
                    {name}
                  </span>
                  <span className="text-lg font-primary text-darkgray">
                    just became a collector
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm font-light font-primary text-darkgray">
                    {date}
                  </div>
                  <div className="text-sm font-light font-primary text-darkgray">
                    {location}
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

export default RecentCollectors;

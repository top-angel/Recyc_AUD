import React from "react";
import Card from "../Card/Card";

import MapChart from "../MapChart/MapChart";
import { useAppSelector } from "../../redux/hooks";

const ActiveLocation = () => {
  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));
  return (
    <Card>
      <div className="text-lg font-semibold font-primary text-darkgray">
        Most Active Locations
      </div>
      <MapChart members={members} />
      <div className="flex flex-col gap-3 overflow-y-scroll h-44">
        {members.map((item: any, index: number) => {
          return (
            <div className="px-3 py-2 text-base font-medium bg-white rounded-lg font-primary text-darkgray">
              {index + 1} {item.location.city}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActiveLocation;

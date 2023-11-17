import React from "react";
import Card from "../Card/Card";
import { useAppSelector } from "../../redux/hooks";

import DateRangeFilter from "./DateRangeFilter";
import CustomTab from "../CustomTab/CustomTab";
import TopTenList from "./TopTenList";

const TopTenBox = () => {
  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  return (
    <Card fullHeight>
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold text-darkgray font-primary">
          Top 10 Collectors
        </div>
        <DateRangeFilter />
      </div>
      <CustomTab headers={["Collector", "Storer", "Creator"]}>
        <TopTenList members={members.slice(0, 6)} />
        <TopTenList members={members.slice(2, 6)} />
        <TopTenList members={members.slice(4, 8)} />
      </CustomTab>
    </Card>
  );
};

export default TopTenBox;

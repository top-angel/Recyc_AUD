import React from "react";
import LeaderboardList from "./LeaderList/LeaderList";
import { Tab } from "@headlessui/react";
import CustomTab from "../CustomTab/CustomTab";
import Card from "../Card/Card";

const Leaderboard = () => {
  const headerData = ["Collector", "Storer"];
  const dummydata1 = [
    {
      user: "Melissa",
      scancounts: "4231 Scans",
    },
    {
      user: "Jamie",
      scancounts: "3214 Scans",
    },
    {
      user: "Sarah",
      scancounts: "2991 Scans",
    },
    {
      user: "Ali",
      scancounts: "2753 Scans",
    },
    {
      user: "Moe",
      scancounts: "2184 Scans",
    },
    {
      user: "Noah",
      scancounts: "2013 Scans",
    },
    {
      user: "Hasan",
      scancounts: "1933 Scans",
    },
    {
      user: "Hank",
      scancounts: "1901 Scans",
    },
    {
      user: "Melissa",
      scancounts: "4231 Scans",
    },
    {
      user: "Melissa",
      scancounts: "4231 Scans",
    },
    {
      user: "Melissa",
      scancounts: "4231 Scans",
    },
    {
      user: "Melissa",
      scancounts: "4231 Scans",
    },
  ];

  const dummydata2 = [
    {
      user: "Noah",
      scancounts: "2013 Scans",
    },
    {
      user: "Hasan",
      scancounts: "1933 Scans",
    },
    {
      user: "Hank",
      scancounts: "1901 Scans",
    },
  ];

  return (
    <Card>
      <div className="mb-3 mt-2 text-left font-primary text-lg font-semibold text-darkgray">
        Leaderboard
      </div>
      <CustomTab headers={headerData}>
        <Tab.Panels className="h-[633px] overflow-y-auto pt-1.5">
          <Tab.Panel>
            <LeaderboardList items={dummydata1} />
          </Tab.Panel>
          <Tab.Panel>
            <LeaderboardList items={dummydata2} />
          </Tab.Panel>
        </Tab.Panels>
      </CustomTab>
    </Card>
  );
};

export default Leaderboard;

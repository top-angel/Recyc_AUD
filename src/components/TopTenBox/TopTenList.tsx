import React from "react";
import Table from "../Table/Table";
import { Tab } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

type props = {
  members: Array<any>;
};

const TopTenList = ({ members }: props) => {
  const router = useRouter();
  const rows = [];
  for (let i = 0; i < members.length; i++) {
    const e: any = members[i];
    const walletno = e.email;
    const location = e.location.country;
    const totalScans = e.phone;
    const rewardsEarned = e.cell;

    rows.push([
      <div
        key={walletno + "1"}
        className="font-primary text-xs font-normal text-darkgray"
      >
        {walletno}
      </div>,

      <div
        key={walletno + "1.5"}
        className="font-primary text-xs font-normal text-darkgray"
      >
        {location}
      </div>,

      <div
        key={walletno + "2"}
        className="font-primary text-xs font-normal text-darkgray"
      >
        {totalScans}
      </div>,

      <div
        key={walletno + "3"}
        className="font-primary text-xs font-normal text-darkgray"
      >
        {rewardsEarned}
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <>
        <Table
          header={[
            "Wallet No",
            "Location",
            "Total Scans",
            "Total Rewards Earned",
          ]}
          rows={rows}
          onClick={(r) => onClickRow(r)}
        />
      </>
    );
  } else {
    content = <div className="">No List.</div>;
  }

  const onClickRow = (props: any) => {
    router.push(`/collector/${props[2].key}`);
  };

  return <Tab.Panel>{content}</Tab.Panel>;
};

export default TopTenList;

import React from "react";
import Table from "../../Table/Table";
import { IoSearch } from "react-icons/io5";
import Card from "src/components/Card/Card";
import { useRouter } from "next/router";

const Leaderboard = ({ members }: any) => {
  const router = useRouter();

  const rows = [];
  for (let i = 0; i < members?.length; i++) {
    const e: any = members[i];
    const walletno = e.public_address;
    // const location = e.location.country;
    // const totalScans = e.phone;
    // const rewardsEarned = e.cell;

    rows.push([
      <div
        key={`${i}+1`}
        className="text-xs font-normal font-primary text-darkgray"
      >
        {members[i]?.profile?.email}
      </div>,

      <div
        key={`${i}+2`}
        className="text-xs font-normal font-primary text-darkgray"
      >
        {members[i]?.profile?.city} {members[i]?.profile?.country}
      </div>,

      <div
        key={`${i}+3`}
        className="text-xs font-normal font-primary text-darkgray"
      >
        {members[i].returned_amount}
      </div>,

      <div
        key={`${i}+4`}
        className="text-xs font-normal font-primary text-darkgray"
      >
        {members[i].rewards}
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <>
        <Table
          header={[
            "Name",
            "Location",
            "Total Colected Items",
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
    router.push(`/creator/DjDtPsdgkI`);
  };

  return (
    <Card>
      <div className="flex justify-between mb-3">
        <div className="text-lg font-semibold font-primary text-darkgray">
          Creators Leaderboard
        </div>
        <div className="text-base text-darkgray">
          <IoSearch />
        </div>
      </div>
      {content}
    </Card>
  );
};

export default Leaderboard;

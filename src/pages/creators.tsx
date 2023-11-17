import { Main } from "../templates/Main";
import React from "react";
import Creators from "../components/categories/creators/Creators";
// import MissionDetails from "../components/MissionDetails/MissionDetails";
import { Meta } from "src/layouts/Meta";

const CreatorsPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Creators />
      {/* <MissionDetails /> */}
    </Main>
  );
};

export default CreatorsPage;

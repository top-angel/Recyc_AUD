import { Main } from "../templates/Main";
import React from "react";
import Storers from "../components/categories/storers/Storers";
import { Meta } from "src/layouts/Meta";

const StorersPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Storers />
    </Main>
  );
};

export default StorersPage;

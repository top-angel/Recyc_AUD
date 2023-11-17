import { Main } from "../templates/Main";
import React from "react";
import Collectors from "../components/categories/collectors/Collectors";
import { Meta } from "../layouts/Meta";

const CollectorsPage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Collectors />
    </Main>
  );
};

export default CollectorsPage;

import { Main } from "../../../templates/Main";
import React from "react";
import { useRouter } from "next/router";
import CollectorsDetails from "src/components/Collector/CollectorDetails";
import { Meta } from "src/layouts/Meta";

const CollectorsMoreDetailPage = () => {
  const router = useRouter();
  const { details } = router.query;
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <CollectorsDetails pathdetails={details} />
    </Main>
  );
};

export default CollectorsMoreDetailPage;
